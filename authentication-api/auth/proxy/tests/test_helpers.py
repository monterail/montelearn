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


@pytest.mark.django_db
def test_proxy_tests_create_response_error(teacher_api_client):
    error_msg = {"lesson_uuid": ["can't be blank"]}
    with requests_mock.mock() as mocked_request:
        mocked_request.post(
            f"{settings.TESTS_API_HOST}/api/tests/",
            status_code=400,
            headers={"Content-type": "application-json"},
            json=error_msg,
        )
        response = teacher_api_client.post(reverse("proxy:tests-list"))

        assert response.status_code == 400
        assert response.json()["detail"] == error_msg
