import pytest

from .factories import LessonFactory


@pytest.mark.django_db
def test_lesson_str():
    lesson = LessonFactory()

    assert lesson.__str__() == lesson.name
