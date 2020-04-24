from .base import *  # noqa
from .constants import *  # noqa


INSTALLED_APPS = ["whitenoise.runserver_nostatic"] + INSTALLED_APPS  # noqa

# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"

REST_PROXY = {"RETURN_RAW": True}

LESSON_API_HOST = "http://lesson-api:8000"
TESTS_API_HOST = "http://tests-api:3000"
