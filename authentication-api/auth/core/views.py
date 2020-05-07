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
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from .serializers import EmailLoginSerializer, EmailRegisterSerializer


class EmailRegister(RegisterView):
    permission_classes = (AllowAny,)
    serializer_class = EmailRegisterSerializer


class VerifyEmail(VerifyEmailView):
    permission_classes = (AllowAny,)


class EmailLogin(LoginView):
    permission_classes = (AllowAny,)
    serializer_class = EmailLoginSerializer


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


class AdminPanelLogin(LoginView):
    permission_classes = (AllowAny,)
    serializer_class = EmailLoginSerializer

    def post(self, request, *args, **kwargs):
        # Login to React Admin Panel dedicated for teachers
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data, context={"request": request})
        self.serializer.is_valid(raise_exception=True)
        self.user = self.serializer.validated_data["user"]
        if not self.user.is_teacher:
            return Response(
                {"detail": "Only teacher is allowed to login."}, status=HTTP_400_BAD_REQUEST
            )

        self.login()
        return self.get_response()
