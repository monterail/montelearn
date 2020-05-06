import uuid

from model_utils.models import TimeStampedModel

from django.core.validators import FileExtensionValidator
from django.db import models

from .constants import GRADES, SUBJECTS


class Lesson(TimeStampedModel):
    GRADES_CHOICES = [(grade, grade) for grade in GRADES]
    SUBJECTS_CHOICES = [(subject, subject) for subject in SUBJECTS]

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    pdf_file = models.FileField(
        upload_to="lesson", validators=[FileExtensionValidator(["pdf"])],
    )
    url = models.URLField(("URL"), max_length=300, blank=True, default="")
    subject = models.CharField(max_length=50, choices=SUBJECTS_CHOICES, blank=True)
    grade = models.CharField(max_length=50, choices=GRADES_CHOICES, blank=True)

    def __str__(self):
        return self.name
