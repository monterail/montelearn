import json
import mimetypes

import requests
from requests import sessions
from requests.exceptions import ConnectionError, SSLError, Timeout
from rest_framework_proxy.adapters import StreamingHTTPAdapter
from rest_framework_proxy.utils import StreamingMultipart, generate_boundary
from rest_framework_proxy.views import ProxyView

from rest_framework.response import Response


class CustomStreamingMultipart(StreamingMultipart):
    # Override StreamingMultipart class to allow parsing multipart/form-data objects
    def generator(self):
        for key, value in self.data.items():
            header = self.build_multipart_header(key)
            yield (f"{header}\r\n\r\n").encode("utf-8")
            yield (f"{str(value)}\r\n").encode("utf-8")

        for key, value in self.files.items():
            content_type = mimetypes.guess_type(value.name)[0] or "application/octet-stream"
            header = self.build_multipart_header(key, value.name, content_type)
            yield (f"{header}\r\n\r\n").encode("utf-8")

            value.seek(0)

            while True:
                data = value.read(self.chunk_size)
                if not data:
                    break
                yield data
            yield b"\r\n"
        yield self.build_multipart_footer().encode("utf-8")

    def build_multipart_header(self, name, filename=None, content_type=None):
        output = []
        output.append(f"--{self.boundary}")

        name_header = f'Content-Disposition: form-data; name="{name}"'
        if filename:
            name_header += f'; filename="{filename}"'
        output.append(name_header)

        if content_type:
            output.append(f"Content-Type: {content_type}")

        return "\r\n".join(output)

    def build_multipart_footer(self):
        return f"--{self.boundary}--\r\n"


class CustomProxyView(ProxyView):
    # Use CustomStreamingMultipart instead of StreamingMultipart
    def proxy(self, request, *args, **kwargs):
        url = self.get_request_url(request)
        params = self.get_request_params(request)
        data = self.get_request_data(request)
        files = self.get_request_files(request)
        headers = self.get_headers(request)
        verify_ssl = self.get_verify_ssl(request)
        cookies = self.get_cookies(request)

        try:
            if files:
                boundary = generate_boundary()
                headers["Content-Type"] = f"multipart/form-data; boundary={boundary}"

                body = CustomStreamingMultipart(data, files, boundary)

                session = sessions.Session()
                session.mount("http://", StreamingHTTPAdapter())
                session.mount("https://", StreamingHTTPAdapter())

                response = session.request(
                    request.method,
                    url,
                    params=params,
                    data=body,
                    headers=headers,
                    timeout=self.proxy_settings.TIMEOUT,
                    verify=verify_ssl,
                    cookies=cookies,
                )
            else:
                headers = {"Content-Type": "application/json", "Accept": "application/json"}
                response = requests.request(
                    request.method,
                    url,
                    params=params,
                    data=json.dumps(data),
                    files=files,
                    headers=headers,
                    timeout=self.proxy_settings.TIMEOUT,
                    verify=verify_ssl,
                    cookies=cookies,
                )
        except (ConnectionError, SSLError):
            status = requests.status_codes.codes.bad_gateway
            return self.create_error_response({"code": status, "error": "Bad gateway"}, status)
        except Timeout:
            status = requests.status_codes.codes.gateway_timeout
            return self.create_error_response(
                {"code": status, "error": "Gateway timed out"}, status
            )

        return self.create_response(response)

    def create_response(self, response):
        # Override create_response to add detail error message in response when status_code >= 400
        status = response.status_code
        if status >= 400:
            body = {"code": status, "detail": response.json(), "error": response.reason}
        else:
            body = self.parse_proxy_response(response)
        return Response(body, status)
