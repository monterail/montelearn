import uuid

from model_utils.models import TimeStampedModel

from django.core.validators import FileExtensionValidator
from django.db import models


class Lesson(TimeStampedModel):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    pdf_file = models.FileField(
        upload_to="lesson",
        blank=True,
        null=True,
        validators=[FileExtensionValidator(["pdf"])],
    )
    url = models.URLField(("URL"), max_length=300, blank=True, default="")

    def __str__(self):
        return self.name
