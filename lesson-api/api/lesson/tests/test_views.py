import pytest

from django.urls import reverse

from .factories import GradeFactory, LessonFactory, SubjectFactory
from .helpers import (
    get_lesson_detail_expected_response,
    get_lesson_list_expected_response,
    get_subject_or_grade_list_expected_response,
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


@pytest.mark.django_db
def test_lesson_create_view_success(api_client):
    with open("api/lesson/tests/pdf_test.pdf", "rb") as pdf_file:
        data = {
            "name": "Test lesson",
            "description": "Test description",
            "pdf_file": pdf_file,
            "url": "https://some-url.com",
            "subject": "biology",
            "grade": "first grade",
        }
        response = api_client.post(reverse("lesson:lesson-list"), data=data, format="multipart")

        assert response.status_code == 201
        assert response.json()["name"] == data["name"]


@pytest.mark.django_db
def test_lesson_patch_update_view_success(api_client):
    lesson = LessonFactory()

    data = {
        "name": "Test lesson",
        "url": "https://some-url.com",
        "grade": "first grade",
    }
    response = api_client.patch(reverse("lesson:lesson-detail", args=[lesson.uuid]), data=data)
    assert response.status_code == 200
    assert response.json()["name"] == data["name"]


@pytest.mark.django_db
def test_lesson_put_update_view_success(api_client):
    lesson = LessonFactory()
    with open("api/lesson/tests/pdf_test.pdf", "rb") as pdf_file:
        data = {
            "name": "Test lesson new",
            "description": "New description",
            "pdf_file": pdf_file,
            "url": "https://some-url.com",
            "subject": "biology",
            "grade": "first grade",
        }
        response = api_client.put(
            reverse("lesson:lesson-detail", args=[lesson.uuid]), data=data, format="multipart"
        )

        response_json = response.json()
        assert response.status_code == 200
        assert response_json["name"] == data["name"]
        assert response_json["description"] == data["description"]


@pytest.mark.django_db
def test_lesson_delete_view_success(api_client):
    lesson = LessonFactory()

    response = api_client.delete(reverse("lesson:lesson-detail", args=[lesson.uuid]))
    assert response.status_code == 204


@pytest.mark.django_db
@pytest.mark.parametrize(
    "subject_filter,options,expected",
    [
        ("biology", ("biology", "physics"), 1),
        ("biology,physics", ("biology", "physics"), 2),
        ("history", ("biology", "physics"), 0),
    ],
)
def test_lesson_filter_by_subject(api_client, subject_filter, options, expected):
    [LessonFactory(subject=SubjectFactory(name=option)) for option in options]

    response = api_client.get(reverse("lesson:lesson-list"), {"subject__in": subject_filter})

    results = response.json()["results"]

    assert response.status_code == 200
    assert len(results) == expected


@pytest.mark.django_db
def test_subject_list_view_success(api_client):
    subjects = [SubjectFactory() for _ in range(3)]

    response = api_client.get(reverse("lesson:subject-list"))

    assert response.status_code == 200
    assert response.json() == get_subject_or_grade_list_expected_response(subjects, response)


@pytest.mark.django_db
def test_subject_create_view_success(api_client):
    response = api_client.post(reverse("lesson:subject-list"), data={"name": "biology"})

    assert response.status_code == 201
    assert response.json()["name"] == "biology"


@pytest.mark.django_db
def test_grade_list_view_success(api_client):
    grades = [GradeFactory() for _ in range(3)]

    response = api_client.get(reverse("lesson:grade-list"))

    assert response.status_code == 200
    assert response.json() == get_subject_or_grade_list_expected_response(grades, response)


@pytest.mark.django_db
def test_grade_create_view_success(api_client):
    response = api_client.post(reverse("lesson:grade-list"), data={"name": "high school"})

    assert response.status_code == 201
    assert response.json()["name"] == "high school"
