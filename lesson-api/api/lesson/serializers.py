from rest_framework import serializers

from .models import Grade, Lesson, Subject


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = (
            "uuid",
            "name",
        )


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = (
            "uuid",
            "name",
        )


class LessonSerializer(serializers.ModelSerializer):
    grade = serializers.CharField(max_length=50)
    subject = serializers.CharField(max_length=50)

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

    def create(self, validated_data):
        grade = validated_data.pop("grade")
        subject = validated_data.pop("subject")
        grade_instance, _ = Grade.objects.get_or_create(name=grade)
        subject_instance, _ = Subject.objects.get_or_create(name=subject)
        lesson_instance = Lesson.objects.create(
            **validated_data, subject=subject_instance, grade=grade_instance
        )
        return lesson_instance

    def update(self, instance, validated_data):
        grade = validated_data.get("grade", instance.grade)
        subject = validated_data.get("subject", instance.subject)
        grade_instance, _ = Grade.objects.get_or_create(name=grade)
        subject_instance, _ = Subject.objects.get_or_create(name=subject)
        instance.subject = subject_instance
        instance.grade = grade_instance
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.pdf_file = validated_data.get("pdf_file", instance.pdf_file)
        instance.url = validated_data.get("url", instance.url)
        instance.save()
        return instance
