import pytest
import requests_mock

from django.conf import settings
from django.urls import reverse

from .helpers import (
    CREATE_LESSON_DATA,
    CREATE_TEST_DATA,
    GRADE_DETAIL_RESPONSE,
    GRADE_LIST_RESPONSE,
    LESSON_API_DETAIL_RESPONSE,
    LESSON_API_LIST_RESPONSE,
    SUBJECT_DETAIL_RESPONSE,
    SUBJECT_LIST_RESPONSE,
    TESTS_API_DETAIL_RESPONSE,
    TESTS_SCORE_DATA,
    TESTS_SCORE_RESPONSE,
    TESTS_STUDENT_DETAIL_RESPONSE,
    TESTS_STUDENT_LIST_RESPONSE,
    UPDATE_LESSON_DATA,
    UPDATE_TEST_DATA,
)


@pytest.mark.django_db
def test_proxy_lesson_list_view(authenticated_api_client):
    with requests_mock.mock() as mocked_request:
        mocked_request.get(
            f"{settings.LESSON_API_HOST}/api/lesson/",
            status_code=200,
            headers={"Content-type": "application/json"},
            json=LESSON_API_LIST_RESPONSE,
        )
        response = authenticated_api_client.get(reverse("proxy:lesson-list"))

        assert response.json() == LESSON_API_LIST_RESPONSE
        assert response.status_code == 200


@pytest.mark.django_db
def test_proxy_lesson_list_view_unauthorized(api_client):
    response = api_client.get(reverse("proxy:lesson-list"))

    assert response.status_code == 401
    assert response.json()["detail"] == "Authentication credentials were not provided."


@pytest.mark.django_db
def test_proxy_lesson_detail_view(authenticated_api_client):
    lesson_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"
    with requests_mock.mock() as mocked_request:
        mocked_request.get(
            f"{settings.LESSON_API_HOST}/api/lesson/{lesson_uuid}/",
            status_code=200,
            headers={"Content-type": "application/json"},
            json=LESSON_API_DETAIL_RESPONSE,
        )
        response = authenticated_api_client.get(reverse("proxy:lesson-detail", args=(lesson_uuid,)))

        assert response.json() == LESSON_API_DETAIL_RESPONSE
        assert response.status_code == 200


@pytest.mark.django_db
def test_proxy_lesson_detail_view_unauthorized(api_client):
    lesson_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"
    response = api_client.get(reverse("proxy:lesson-detail", args=(lesson_uuid,)))

    assert response.status_code == 401
    assert response.json()["detail"] == "Authentication credentials were not provided."


@pytest.mark.django_db
def test_proxy_lesson_create_view_success_for_teacher(teacher_api_client):
    with requests_mock.mock() as mocked_request:
        with open("auth/proxy/tests/pdf_test.pdf", "rb") as pdf_file:
            CREATE_LESSON_DATA["pdf_file"] = pdf_file
            mocked_request.post(
                f"{settings.LESSON_API_HOST}/api/lesson/",
                status_code=201,
                headers={"Content-type": "application/json"},
                json=LESSON_API_DETAIL_RESPONSE,
            )

            response = teacher_api_client.post(
                reverse("proxy:lesson-list"), data=CREATE_LESSON_DATA, format="multipart"
            )

            assert response.json() == LESSON_API_DETAIL_RESPONSE
            assert response.status_code == 201


@pytest.mark.django_db
def test_proxy_lesson_create_view_not_permitted_for_student(authenticated_api_client):
    with open("auth/proxy/tests/pdf_test.pdf", "rb") as pdf_file:
        CREATE_LESSON_DATA["pdf_file"] = pdf_file

        response = authenticated_api_client.post(
            reverse("proxy:lesson-list"), data=CREATE_LESSON_DATA, format="multipart"
        )

        assert response.status_code == 403
        assert response.json()["detail"] == "Only teacher is allowed to perform this action."


@pytest.mark.django_db
def test_proxy_lesson_update_view_success_for_teacher(teacher_api_client):
    lesson_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"
    with requests_mock.mock() as mocked_request:
        with open("auth/proxy/tests/pdf_test.pdf", "rb") as pdf_file:
            UPDATE_LESSON_DATA["pdf_file"] = pdf_file
            mocked_request.put(
                f"{settings.LESSON_API_HOST}/api/lesson/{lesson_uuid}/",
                status_code=200,
                headers={"Content-type": "application/json"},
                json=LESSON_API_DETAIL_RESPONSE,
            )

            response = teacher_api_client.put(
                reverse("proxy:lesson-detail", args=(lesson_uuid,)),
                data=UPDATE_LESSON_DATA,
                format="multipart",
            )

            assert response.json() == LESSON_API_DETAIL_RESPONSE
            assert response.status_code == 200


@pytest.mark.django_db
def test_proxy_lesson_update_view_not_permitted_for_student(authenticated_api_client):
    lesson_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"
    with open("auth/proxy/tests/pdf_test.pdf", "rb") as pdf_file:
        UPDATE_LESSON_DATA["pdf_file"] = pdf_file

        response = authenticated_api_client.put(
            reverse("proxy:lesson-detail", args=(lesson_uuid,)),
            data=UPDATE_LESSON_DATA,
            format="multipart",
        )

        assert response.status_code == 403
        assert response.json()["detail"] == "Only teacher is allowed to perform this action."


@pytest.mark.django_db
def test_proxy_lesson_partial_update_view_success_for_teacher(teacher_api_client):
    lesson_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"
    with requests_mock.mock() as mocked_request:
        data = {"name": "Test lesson new", "url": "https://some-url-new.com"}
        mocked_request.patch(
            f"{settings.LESSON_API_HOST}/api/lesson/{lesson_uuid}/",
            status_code=200,
            headers={"Content-type": "application/json"},
            json=LESSON_API_DETAIL_RESPONSE,
        )

        response = teacher_api_client.patch(
            reverse("proxy:lesson-detail", args=(lesson_uuid,)), data=data
        )

        assert response.json() == LESSON_API_DETAIL_RESPONSE
        assert response.status_code == 200


@pytest.mark.django_db
def test_proxy_lesson_partial_update_view_not_permitted_for_student(authenticated_api_client):
    lesson_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"
    data = {
        "name": "Test lesson new",
        "url": "https://some-url-new.com",
    }

    response = authenticated_api_client.patch(
        reverse("proxy:lesson-detail", args=(lesson_uuid,)), data=data
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Only teacher is allowed to perform this action."


@pytest.mark.django_db
def test_proxy_lesson_delete_view_success_for_teacher(teacher_api_client):
    lesson_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"
    with requests_mock.mock() as mocked_request:
        mocked_request.delete(
            f"{settings.LESSON_API_HOST}/api/lesson/{lesson_uuid}/", status_code=204,
        )

        response = teacher_api_client.delete(reverse("proxy:lesson-detail", args=(lesson_uuid,)))

        assert response.status_code == 204


@pytest.mark.django_db
def test_proxy_lesson_delete_view_not_permitted_for_student(authenticated_api_client):
    lesson_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"

    response = authenticated_api_client.delete(reverse("proxy:lesson-detail", args=(lesson_uuid,)))

    assert response.status_code == 403
    assert response.json()["detail"] == "Only teacher is allowed to perform this action."


@pytest.mark.django_db
def test_proxy_tests_admin_list_view_not_permitted(authenticated_api_client):
    response = authenticated_api_client.get(reverse("proxy:tests-admin-list"))

    assert response.status_code == 403
    assert response.json()["detail"] == "Only teacher is allowed to perform this action."


@pytest.mark.django_db
def test_proxy_tests_admin_detail_view(teacher_api_client):
    tests_uuid = "cd6ba3e0-edac-43ff-b9c9-a6ced23fedc4"
    with requests_mock.mock() as mocked_request:
        mocked_request.get(
            f"{settings.TESTS_API_HOST}/api/admin/tests/{tests_uuid}/",
            status_code=200,
            headers={"Content-type": "application/json"},
            json=TESTS_API_DETAIL_RESPONSE,
        )
        response = teacher_api_client.get(reverse("proxy:tests-admin-detail", args=(tests_uuid,)))

        assert response.json() == TESTS_API_DETAIL_RESPONSE
        assert response.status_code == 200


@pytest.mark.django_db
def test_proxy_tests_detail_view_not_permitted(authenticated_api_client):
    tests_uuid = "cd6ba3e0-edac-43ff-b9c9-a6ced23fedc4"
    response = authenticated_api_client.get(reverse("proxy:tests-admin-detail", args=(tests_uuid,)))

    assert response.status_code == 403
    assert response.json()["detail"] == "Only teacher is allowed to perform this action."


@pytest.mark.django_db
def test_proxy_tests_admin_create_view_success_for_teacher(teacher_api_client):
    with requests_mock.mock() as mocked_request:
        mocked_request.post(
            f"{settings.TESTS_API_HOST}/api/admin/tests/",
            status_code=201,
            headers={"Content-type": "application/json"},
            json=TESTS_API_DETAIL_RESPONSE,
        )

        response = teacher_api_client.post(reverse("proxy:tests-admin-list"), data=CREATE_TEST_DATA)

        assert response.json() == TESTS_API_DETAIL_RESPONSE
        assert response.status_code == 201


@pytest.mark.django_db
def test_proxy_tests_admin_create_view_not_permitted_for_student(authenticated_api_client):
    response = authenticated_api_client.post(
        reverse("proxy:tests-admin-list"), data=CREATE_TEST_DATA
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Only teacher is allowed to perform this action."


@pytest.mark.django_db
def test_proxy_tests_admin_update_view_success_for_teacher(teacher_api_client):
    test_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"
    with requests_mock.mock() as mocked_request:
        mocked_request.put(
            f"{settings.TESTS_API_HOST}/api/admin/tests/{test_uuid}/",
            status_code=200,
            headers={"Content-type": "application/json"},
            json=TESTS_API_DETAIL_RESPONSE,
        )

        response = teacher_api_client.put(
            reverse("proxy:tests-admin-detail", args=(test_uuid,)), data=UPDATE_TEST_DATA,
        )

        assert response.json() == TESTS_API_DETAIL_RESPONSE
        assert response.status_code == 200


@pytest.mark.django_db
def test_proxy_tests_admin_update_view_not_permitted_for_student(authenticated_api_client):
    test_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"

    response = authenticated_api_client.put(
        reverse("proxy:tests-admin-detail", args=(test_uuid,)), data=UPDATE_TEST_DATA,
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Only teacher is allowed to perform this action."


@pytest.mark.django_db
def test_proxy_tests_admin_delete_view_success_for_teacher(teacher_api_client):
    test_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"
    with requests_mock.mock() as mocked_request:
        mocked_request.delete(
            f"{settings.TESTS_API_HOST}/api/admin/tests/{test_uuid}/", status_code=204,
        )

        response = teacher_api_client.delete(reverse("proxy:tests-admin-detail", args=(test_uuid,)))

        assert response.status_code == 204


@pytest.mark.django_db
def test_proxy_tests_admin_delete_view_not_permitted_for_student(authenticated_api_client):
    test_uuid = "00981f5a-6685-4589-ad77-6a7e2a70ed9d"

    response = authenticated_api_client.delete(
        reverse("proxy:tests-admin-detail", args=(test_uuid,))
    )
    assert response.status_code == 403
    assert response.json()["detail"] == "Only teacher is allowed to perform this action."


@pytest.mark.django_db
def test_proxy_subject_list_view(authenticated_api_client):
    with requests_mock.mock() as mocked_request:
        mocked_request.get(
            f"{settings.LESSON_API_HOST}/api/subject/",
            status_code=200,
            headers={"Content-type": "application/json"},
            json=SUBJECT_LIST_RESPONSE,
        )
        response = authenticated_api_client.get(reverse("proxy:subject-list"))

        assert response.json() == SUBJECT_LIST_RESPONSE
        assert response.status_code == 200


@pytest.mark.django_db
def test_proxy_subject_list_view_unauthaorized(api_client):
    response = api_client.get(reverse("proxy:subject-list"))

    assert response.status_code == 401
    assert response.json()["detail"] == "Authentication credentials were not provided."


@pytest.mark.django_db
def test_proxy_subject_create_view_success_for_teacher(teacher_api_client):
    with requests_mock.mock() as mocked_request:
        mocked_request.post(
            f"{settings.LESSON_API_HOST}/api/subject/",
            status_code=201,
            headers={"Content-type": "application/json"},
            json=SUBJECT_DETAIL_RESPONSE,
        )

        response = teacher_api_client.post(reverse("proxy:subject-list"), data={"name": "biology"})

        assert response.json() == SUBJECT_DETAIL_RESPONSE
        assert response.status_code == 201


@pytest.mark.django_db
def test_proxy_subject_create_view_not_permitted_for_student(authenticated_api_client):
    response = authenticated_api_client.post(
        reverse("proxy:subject-list"), data={"name": "biology"}
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Only teacher is allowed to perform this action."


@pytest.mark.django_db
def test_proxy_grade_list_view(authenticated_api_client):
    with requests_mock.mock() as mocked_request:
        mocked_request.get(
            f"{settings.LESSON_API_HOST}/api/grade/",
            status_code=200,
            headers={"Content-type": "application/json"},
            json=GRADE_LIST_RESPONSE,
        )
        response = authenticated_api_client.get(reverse("proxy:grade-list"))

        assert response.json() == GRADE_LIST_RESPONSE
        assert response.status_code == 200


@pytest.mark.django_db
def test_proxy_grade_list_view_unauthorized(api_client):
    response = api_client.get(reverse("proxy:grade-list"))

    assert response.status_code == 401
    assert response.json()["detail"] == "Authentication credentials were not provided."


@pytest.mark.django_db
def test_proxy_grade_create_view_success_for_teacher(teacher_api_client):
    with requests_mock.mock() as mocked_request:
        mocked_request.post(
            f"{settings.LESSON_API_HOST}/api/grade/",
            status_code=201,
            headers={"Content-type": "application/json"},
            json=GRADE_DETAIL_RESPONSE,
        )

        response = teacher_api_client.post(
            reverse("proxy:grade-list"), data={"name": "first grade"}
        )

        assert response.json() == GRADE_DETAIL_RESPONSE
        assert response.status_code == 201


@pytest.mark.django_db
def test_proxy_grade_create_view_not_permitted_for_student(authenticated_api_client):
    response = authenticated_api_client.post(
        reverse("proxy:grade-list"), data={"name": "first grade"}
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Only teacher is allowed to perform this action."


@pytest.mark.django_db
def test_proxy_tests_student_list_view(authenticated_api_client):
    with requests_mock.mock() as mocked_request:
        mocked_request.get(
            f"{settings.TESTS_API_HOST}/api/tests/",
            status_code=200,
            headers={"Content-type": "application/json"},
            json=TESTS_STUDENT_LIST_RESPONSE,
        )
        response = authenticated_api_client.get(reverse("proxy:tests-list"))

        assert response.json() == TESTS_STUDENT_LIST_RESPONSE
        assert response.status_code == 200


@pytest.mark.django_db
def test_proxy_tests_student_list_view_unauthorized(api_client):
    response = api_client.get(reverse("proxy:tests-list"))

    assert response.status_code == 401
    assert response.json()["detail"] == "Authentication credentials were not provided."


@pytest.mark.django_db
def test_proxy_tests_student_detail_view(authenticated_api_client):
    test_uuid = "some_uuid"
    with requests_mock.mock() as mocked_request:
        mocked_request.get(
            f"{settings.TESTS_API_HOST}/api/tests/{test_uuid}/",
            status_code=200,
            headers={"Content-type": "application/json"},
            json=TESTS_STUDENT_DETAIL_RESPONSE,
        )
        response = authenticated_api_client.get(reverse("proxy:tests-detail", args=(test_uuid,)))

        assert response.json() == TESTS_STUDENT_DETAIL_RESPONSE
        assert response.status_code == 200


@pytest.mark.django_db
def test_proxy_tests_student_detail_view_unauthorized(api_client):
    test_uuid = "some_uuid"
    response = api_client.get(reverse("proxy:tests-detail", args=(test_uuid,)))

    assert response.status_code == 401
    assert response.json()["detail"] == "Authentication credentials were not provided."


@pytest.mark.django_db
def test_proxy_tests_score_student_detail_view(authenticated_api_client):
    test_uuid = "4f33c180-ba79-4742-be72-553b2866d31f"
    with requests_mock.mock() as mocked_request:
        mocked_request.post(
            f"{settings.TESTS_API_HOST}/api/tests/{test_uuid}/scores/",
            status_code=201,
            headers={"Content-type": "application/json"},
            json=TESTS_SCORE_RESPONSE,
        )
        response = authenticated_api_client.post(
            reverse("proxy:tests-score", args=(test_uuid,)), json=TESTS_SCORE_DATA
        )

        authenticated_api_client.user.refresh_from_db()

        assert str(authenticated_api_client.user.score_set.last().test_uuid) == test_uuid
        assert response.json() == TESTS_SCORE_RESPONSE
        assert response.status_code == 201


@pytest.mark.django_db
def test_proxy_tests_score_student_detail_view_unauthorized(api_client):
    test_uuid = "some_uuid"
    response = api_client.post(
        reverse("proxy:tests-score", args=(test_uuid,)), json=TESTS_SCORE_DATA
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Authentication credentials were not provided."
