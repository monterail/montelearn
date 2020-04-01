# Settings for local development environment
from .base import *  # noqa
from .base import env
from .constants import *  # noqa


DEFAULT_FROM_EMAIL = "webmaster@localhost"
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# whitenoise needs to be at the top
INSTALLED_APPS = ["whitenoise.runserver_nostatic"] + INSTALLED_APPS  # noqa

ALLOWED_HOSTS = ["0.0.0.0", "127.0.0.1", "localhost"]

# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#internal-ips
INTERNAL_IPS = ["127.0.0.1", "10.0.2.2"]
if env("USE_DOCKER") == "yes":
    import socket

    hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
    INTERNAL_IPS += [ip[:-1] + "1" for ip in ips]

SWAGGER_ENABLED = True
