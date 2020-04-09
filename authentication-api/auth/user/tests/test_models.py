import pytest

from ..models import User
from .factories import UserFactory


@pytest.mark.django_db
def test_user_name():
    user = UserFactory(first_name="First_name", last_name="Last_name")
    assert user.name == "First_name Last_name"


@pytest.mark.django_db
def test_create_super_user():
    user = User.objects.create_superuser("user@user.com", "password1234")
    assert user.email == "user@user.com"
    assert user.is_staff is True
    assert user.is_superuser is True


@pytest.mark.django_db
def test_create_user():
    user = User.objects.create_user("user@user.com", "password1234")
    assert user.email == "user@user.com"
    assert user.is_staff is False
    assert user.is_superuser is False


@pytest.mark.django_db
def test_create_user_no_email():
    with pytest.raises(ValueError) as error:
        User.objects.create_user("", "password1234")
        assert error.value == "Email must be provided"
