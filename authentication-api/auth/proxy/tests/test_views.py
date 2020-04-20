import pytest

from django.conf import settings
from django.urls import reverse

import requests_mock

from .helpers import LESSON_API_LIST_RESPONSE, LESSON_API_DETAIL_RESPONSE


@pytest.mark.django_db
def test_proxy_lesson_list_view(authenticated_api_client):
    with requests_mock.mock() as mocked_request:
        mocked_request.get(
            f"{settings.LESSON_API_HOST}/api/lesson",
            status_code=200,
            text=LESSON_API_LIST_RESPONSE,
        )
        response = authenticated_api_client.get(reverse("proxy:lesson-list"))

        assert response.content.decode("utf-8") == LESSON_API_LIST_RESPONSE
        assert response.status_code == 200


@pytest.mark.django_db
def test_proxy_lesson_list_view_unauthorized(api_client):
    response = api_client.get(reverse("proxy:lesson-list"))

    assert response.status_code == 401


@pytest.mark.django_db
def test_proxy_lesson_detail_view(authenticated_api_client):
    lesson_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"
    with requests_mock.mock() as mocked_request:
        mocked_request.get(
            f"{settings.LESSON_API_HOST}/api/lesson/{lesson_uuid}",
            status_code=200,
            text=LESSON_API_DETAIL_RESPONSE,
        )
        response = authenticated_api_client.get(
            reverse("proxy:lesson-detail", args=(lesson_uuid,))
        )

        assert response.content.decode("utf-8") == LESSON_API_DETAIL_RESPONSE
        assert response.status_code == 200


@pytest.mark.django_db
def test_proxy_lesson_detail_view_unauthorized(api_client):
    lesson_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"
    response = api_client.get(reverse("proxy:lesson-detail", args=(lesson_uuid,)))

    assert response.status_code == 401
