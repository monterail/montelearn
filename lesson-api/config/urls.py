from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path

from .schema import schema_view


urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path("api/", include("api.lesson.urls")),
]


if settings.SWAGGER_ENABLED:
    urlpatterns += [
        re_path(
            r"swagger(?P<format>\.json|\.yaml)$",
            schema_view.without_ui(cache_timeout=0),
            name="schema-json",
        ),
        path(
            "swagger/",
            schema_view.with_ui("swagger", cache_timeout=0),
            name="schema-swagger-ui",
        ),
        path(
            "redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
        ),
        path("swagger-auth/", include("rest_framework.urls", "swagger-auth")),
    ]

if settings.DEBUG:
    # https://docs.djangoproject.com/en/2.2/howto/static-files/#serving-files-uploaded-by-a-user-during-development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
