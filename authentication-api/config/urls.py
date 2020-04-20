from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.views import (
    PasswordResetCompleteView,
    PasswordResetConfirmView,
)
from django.urls import include, path, re_path

from auth.core.views import (
    ConfirmEmail,
    EmailLogin,
    EmailPasswordChange,
    EmailPasswordReset,
    EmailPasswordResetConfirm,
    EmailRegister,
    Logout,
    RefreshToken,
    VerifyEmail,
    VerifyToken,
)
from .schema import schema_view


# Here to enable top-level names for reverse in django-rest-auth
email_auth_urls = [
    path("auth/email/login/", EmailLogin.as_view(), name="rest_login"),
    path("auth/logout/", Logout.as_view(), name="rest_logout"),
    path(
        "auth/email/password/change/",
        EmailPasswordChange.as_view(),
        name="rest_password_change",
    ),
    path(
        "auth/email/password/reset/",
        EmailPasswordReset.as_view(),
        name="rest_password_reset",
    ),
    path(
        "auth/email/password/reset/confirm/",
        EmailPasswordResetConfirm.as_view(),
        name="rest_password_reset_confirm",
    ),
    path("auth/email/register/", EmailRegister.as_view(), name="rest_register"),
    path(
        "auth/email/register/verify-email/",
        VerifyEmail.as_view(),
        name="rest_verify_email",
    ),
    path("auth/verify-token/", VerifyToken.as_view(), name="rest_verify_token"),
    path("auth/refresh-token/", RefreshToken.as_view(), name="rest_refresh_token"),
]


urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path("api/", include(email_auth_urls)),
    path("api/", include("auth.core.urls")),
    path("api/", include("auth.user.urls")),
    path("api/", include("auth.proxy.urls")),
    re_path(
        r"^confirm-email/(?P<key>[-:\w]+)/$",
        ConfirmEmail.as_view(),
        name="account_confirm_email",
    ),
    re_path(
        r"^password-reset/(?P<uidb64>[0-9A-Za-z_\-]+)/"
        "(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path(
        "password-reset/done/",
        PasswordResetCompleteView.as_view(),
        name="password_reset_complete",
    ),
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
