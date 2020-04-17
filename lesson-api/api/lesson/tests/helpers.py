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
    }
