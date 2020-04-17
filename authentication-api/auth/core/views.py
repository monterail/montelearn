from allauth.account.views import ConfirmEmailView
from rest_auth.registration.views import RegisterView, VerifyEmailView
from rest_auth.views import (
    LoginView,
    LogoutView,
    PasswordChangeView,
    PasswordResetConfirmView,
    PasswordResetView,
)
from rest_framework_jwt.views import RefreshJSONWebToken, VerifyJSONWebToken

from django.urls import reverse

from rest_framework.permissions import AllowAny, IsAuthenticated

from .helpers import CustomUserJSONRenderer
from .serializers import EmailLoginSerializer, EmailRegisterSerializer


class EmailRegister(RegisterView):
    permission_classes = (AllowAny,)
    serializer_class = EmailRegisterSerializer
    renderer_classes = (CustomUserJSONRenderer,)


class VerifyEmail(VerifyEmailView):
    permission_classes = (AllowAny,)


class EmailLogin(LoginView):
    permission_classes = (AllowAny,)
    serializer_class = EmailLoginSerializer
    renderer_classes = (CustomUserJSONRenderer,)


class Logout(LogoutView):
    permission_classes = (IsAuthenticated,)


class EmailPasswordChange(PasswordChangeView):
    permission_classes = (IsAuthenticated,)


class EmailPasswordReset(PasswordResetView):
    permission_classes = (AllowAny,)


class EmailPasswordResetConfirm(PasswordResetConfirmView):
    permission_classes = (AllowAny,)


class ConfirmEmail(ConfirmEmailView):
    template_name = "user/email_confirm.html"

    def get_redirect_url(self):
        return reverse("account_confirm_email", kwargs={"key": self.kwargs["key"]})


class RefreshToken(RefreshJSONWebToken):
    permission_classes = (AllowAny,)


class VerifyToken(VerifyJSONWebToken):
    permission_classes = (AllowAny,)
