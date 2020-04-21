import mimetypes

import requests
from requests import sessions
from requests.exceptions import ConnectionError, SSLError, Timeout
from rest_framework_proxy.adapters import StreamingHTTPAdapter
from rest_framework_proxy.utils import StreamingMultipart, generate_boundary
from rest_framework_proxy.views import ProxyView


class CustomStreamingMultipart(StreamingMultipart):
    # Override StreamingMultipart class to allow parsing multipart/form-data objects
    def generator(self):
        for (k, v) in self.data.items():
            yield ("%s\r\n\r\n" % self.build_multipart_header(k)).encode("utf-8")
            yield ("%s\r\n" % str(v)).encode("utf-8")

        for (k, v) in self.files.items():
            content_type = mimetypes.guess_type(v.name)[0] or "application/octet-stream"
            yield ("%s\r\n\r\n" % self.build_multipart_header(k, v.name, content_type)).encode(
                "utf-8"
            )

            v.seek(0)

            while True:
                data = v.read(self.chunk_size)
                if not data:
                    break
                yield data
            yield b"\r\n"
        yield self.build_multipart_footer().encode("utf-8")

    def build_multipart_header(self, name, filename=None, content_type=None):
        output = []
        output.append("--%s" % self.boundary)

        string = 'Content-Disposition: form-data; name="%s"' % name
        if filename:
            string += '; filename="%s"' % filename
        output.append(string)

        if content_type:
            output.append("Content-Type: %s" % content_type)

        return "\r\n".join(output)

    def build_multipart_footer(self):
        return "--%s--\r\n" % self.boundary


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
                headers["Content-Type"] = "multipart/form-data; boundary=%s" % boundary

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
                response = requests.request(
                    request.method,
                    url,
                    params=params,
                    data=data,
                    files=files,
                    headers=headers,
                    timeout=self.proxy_settings.TIMEOUT,
                    verify=verify_ssl,
                    cookies=cookies,
                )
        except (ConnectionError, SSLError):
            status = requests.status_codes.codes.bad_gateway
            return self.create_error_response({"code": status, "error": "Bad gateway"}, status)
        except (Timeout):
            status = requests.status_codes.codes.gateway_timeout
            return self.create_error_response(
                {"code": status, "error": "Gateway timed out"}, status
            )

        return self.create_response(response)
