import pytest

from django.urls import reverse

from .factories import LessonFactory
from .helpers import (
    get_lesson_detail_expected_response,
    get_lesson_list_expected_response,
)


@pytest.mark.django_db
def test_lesson_list_view_success(api_client):
    lessons = [LessonFactory() for _ in range(3)]

    response = api_client.get(reverse("lesson:lesson-list"))

    assert response.status_code == 200
    assert response.json() == get_lesson_list_expected_response(lessons, response)


@pytest.mark.django_db
def test_lesson_detail_view_success(api_client):
    lesson = LessonFactory()

    response = api_client.get(reverse("lesson:lesson-detail", args=[lesson.uuid]))

    assert response.status_code == 200
    assert response.json() == get_lesson_detail_expected_response(lesson)
