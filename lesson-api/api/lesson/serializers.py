from rest_framework import serializers

from .models import Lesson


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = (
            "uuid",
            "name",
            "description",
            "subject",
            "grade",
            "pdf_file",
            "url",
        )
