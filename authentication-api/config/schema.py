from drf_yasg import openapi
from drf_yasg.views import get_schema_view

from rest_framework import permissions


# Schema configuration
schema_view = get_schema_view(
    openapi.Info(title="auth", default_version="0.0.1"),
    public=True,
    # Swagger is enabled only if settings.SWAGGER_ENABLED is True
    permission_classes=(permissions.AllowAny,),
)
