from collections import defaultdict

from django.conf import settings


def get_lesson_list_expected_response(lessons, response):
    expected_response = defaultdict(list)
    for lesson in lessons:
        expected_response["results"].append(get_lesson_detail_expected_response(lesson))

    expected_response["count"] = len(lessons)
    expected_response["next"] = None
    expected_response["previous"] = None

    return expected_response


def get_lesson_detail_expected_response(lesson):
    return {
        "uuid": str(lesson.uuid),
        "name": lesson.name,
        "description": lesson.description,
        "pdf_file": "http://testserver" + settings.MEDIA_URL + str(lesson.pdf_file),
        "url": lesson.url,
        "subject": lesson.subject.name,
        "grade": lesson.grade.name,
    }


def get_subject_or_grade_list_expected_response(items, response):
    expected_response = defaultdict(list)
    for item in items:
        expected_response["results"].append(get_subject_or_grade_detail_expected_response(item))

    expected_response["count"] = len(items)
    expected_response["next"] = None
    expected_response["previous"] = None

    return expected_response


def get_subject_or_grade_detail_expected_response(item):
    return {
        "uuid": str(item.uuid),
        "name": item.name,
    }
