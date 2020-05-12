import uuid

from model_utils.models import TimeStampedModel

from django.core.validators import FileExtensionValidator
from django.db import models


class Grade(models.Model):
    name = models.CharField(max_length=50, unique=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return self.name


class Subject(models.Model):
    name = models.CharField(max_length=50, unique=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return self.name


class Lesson(TimeStampedModel):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    pdf_file = models.FileField(upload_to="lesson", validators=[FileExtensionValidator(["pdf"])],)
    url = models.URLField(("URL"), max_length=300, blank=True, default="")
    subject = models.ForeignKey("Subject", on_delete=models.PROTECT, related_name="subject")
    grade = models.ForeignKey("Grade", on_delete=models.PROTECT, related_name="grade")

    def __str__(self):
        return self.name
