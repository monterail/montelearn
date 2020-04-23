import pytest
import requests_mock
from requests.exceptions import ConnectionError, SSLError, Timeout

from django.conf import settings
from django.urls import reverse


@pytest.mark.parametrize(
    "exception,status_code,error_msg",
    [
        (ConnectionError, 502, "Bad gateway"),
        (SSLError, 502, "Bad gateway"),
        (Timeout, 504, "Gateway timed out"),
    ],
)
@pytest.mark.django_db
def test_proxy_lesson_list_view_connection_error(
    authenticated_api_client, exception, status_code, error_msg
):
    with requests_mock.mock() as mocked_request:
        mocked_request.get(
            f"{settings.LESSON_API_HOST}/api/lesson/", exc=exception,
        )
        response = authenticated_api_client.get(reverse("proxy:lesson-list"))

        assert response.status_code == status_code
        assert response.data["error"] == error_msg
