import pytest

from ..serializers import UserSerializer
from .factories import UserFactory


@pytest.mark.django_db
def test_user_deserialization():
    user = UserFactory()

    serializer = UserSerializer(user)

    assert serializer.data["email"] == user.email
    assert serializer.data["first_name"] == user.first_name
    assert serializer.data["last_name"] == user.last_name
