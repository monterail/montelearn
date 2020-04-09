import pytest

from ..serializers import EmailRegisterSerializer


@pytest.mark.django_db
def test_user_register_deserialization():
    data = {
        "first_name": "user_first",
        "last_name": "user_last",
        "email": "user@example.com",
        "password1": "user_password1234",
        "password2": "user_password1234",
    }
    serializer = EmailRegisterSerializer(data=data)
    serializer.is_valid()
    result = serializer.get_cleaned_data()
    assert result["first_name"] == "user_first"
    assert result["last_name"] == "user_last"
    assert result["email"] == "user@example.com"
    assert result["password1"] == "user_password1234"
