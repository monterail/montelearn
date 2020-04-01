import pytest

from django.conf import settings

from ..serializers import LessonSerializer
from .factories import LessonFactory


@pytest.mark.django_db
def test_lesson_deserialization():
    lesson = LessonFactory()

    serializer = LessonSerializer(lesson)

    assert serializer.data["uuid"] == str(lesson.uuid)
    assert serializer.data["name"] == lesson.name
    assert serializer.data["description"] == lesson.description
    assert serializer.data["pdf_file"] == settings.MEDIA_URL + str(lesson.pdf_file)
