from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer

from rest_framework import serializers


class EmailLoginSerializer(LoginSerializer):
    email = serializers.EmailField(required=True, allow_blank=False)
    password = serializers.CharField()
    username = None


class EmailRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = None

    def get_cleaned_data(self):
        return {
            "first_name": self.validated_data["first_name"],
            "last_name": self.validated_data["last_name"],
            "email": self.validated_data["email"],
            "password1": self.validated_data["password1"],
        }
