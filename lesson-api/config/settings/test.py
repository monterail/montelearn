from .base import *  # noqa
from .constants import *  # noqa


INSTALLED_APPS = ["whitenoise.runserver_nostatic"] + INSTALLED_APPS  # noqa

# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"
BASIC_AUTH_WHITELISTED_IP_NETWORKS = ["0.0.0.0/0"]
