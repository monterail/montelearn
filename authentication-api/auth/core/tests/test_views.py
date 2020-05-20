import re

import pytest

from django.contrib.auth.tokens import default_token_generator
from django.contrib.messages import get_messages
from django.test import Client
from django.urls import reverse
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode

from ...user.models import User
from .helpers import PasswordResetConfirmClient


@pytest.mark.django_db
def test_email_registration_invalid_data(api_client):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "",
            "last_name": "",
            "email": "userexample.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    assert response.status_code == 400
    assert response.data == {
        "email": ["Enter a valid email address."],
        "first_name": ["This field may not be blank."],
        "last_name": ["This field may not be blank."],
    }


@pytest.mark.django_db
def test_email_registration(api_client):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "user first name",
            "last_name": "user last name",
            "email": "user@example.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    assert response.status_code == 201
    assert "access_token" in response.data
    assert "refresh_token" in response.data


@pytest.mark.django_db
def test_email_registration_confirm_email(api_client, mailoutbox):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "user first name",
            "last_name": "user last name",
            "email": "user@example.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    assert response.status_code == 201
    assert len(mailoutbox) == 1

    # Find confirmation link in the last email sent by the app
    email_url_match = re.search(r"https?://[^/]*(/.*confirm-email/\S*/)", mailoutbox[0].body)

    assert email_url_match

    response = Client().get(email_url_match.groups()[0], follow=True)

    assert response.status_code == 200

    response = Client().post(email_url_match.groups()[0], follow=True)
    messages = list(get_messages(response.wsgi_request))

    assert response.redirect_chain[0][0] == email_url_match.groups()[0]
    assert "You have confirmed " in str(messages[0])


@pytest.mark.django_db
def test_email_login(api_client):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "user first name",
            "last_name": "user last name",
            "email": "user@example.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    assert response.status_code == 201

    response = api_client.post(
        reverse("rest_login"), data={"email": "user@example.com", "password": "1234example1234"},
    )

    assert "access_token" in response.data
    assert "refresh_token" in response.data
    assert response.status_code == 200


@pytest.mark.django_db
def test_email_login_invalid_password(api_client):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "user first name",
            "last_name": "user last name",
            "email": "user@example.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    assert response.status_code == 201

    response = api_client.post(
        reverse("rest_login"), data={"email": "user@example.com", "password": "invalid"}
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_email_password_change(api_client):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "user first name",
            "last_name": "user last name",
            "email": "user@example.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    assert response.status_code == 201
    token = response.data["access_token"]
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    new_password = "1234example1234-changed"

    response = api_client.post(
        reverse("rest_password_change"),
        data={
            "email": "user@example.com",
            "new_password1": new_password,
            "new_password2": new_password,
        },
    )

    assert response.status_code == 200

    response = api_client.post(
        reverse("rest_login"), data={"email": "user@example.com", "password": new_password},
    )

    assert response.status_code == 200


@pytest.mark.django_db
def test_email_reset_password(api_client, mailoutbox):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "user first name",
            "last_name": "user last name",
            "email": "user@example.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    assert response.status_code == 201
    response = api_client.post(reverse("rest_password_reset"), data={"email": "user@example.com"})

    assert response.status_code == 200
    assert len(mailoutbox) == 2

    email_url_match = re.search(r"https?://[^/]*(/.*password-reset/\S*)", mailoutbox[1].body)

    assert email_url_match

    new_password = "1234example1234-new"
    response = PasswordResetConfirmClient().post(
        path=email_url_match.groups()[0],
        data={"new_password1": new_password, "new_password2": new_password},
    )

    assert response.status_code == 302

    response = api_client.post(
        reverse("rest_login"), data={"email": "user@example.com", "password": new_password},
    )

    assert response.status_code == 200


@pytest.mark.django_db
def test_email_reset_password_confirm(api_client, mailoutbox):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "user first name",
            "last_name": "user last name",
            "email": "user@example.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    assert response.status_code == 201

    user = User.objects.get(email="user@example.com")
    new_password = "1234example1234-new"

    response = api_client.post(
        reverse("rest_password_reset_confirm"),
        data={
            "new_password1": new_password,
            "new_password2": new_password,
            "uid": force_text(urlsafe_base64_encode(force_bytes(user.pk))),
            "token": default_token_generator.make_token(user),
        },
    )

    assert response.status_code == 200

    response = api_client.post(
        reverse("rest_login"), data={"email": "user@example.com", "password": new_password},
    )

    assert response.status_code == 200


@pytest.mark.django_db
def test_user_email_logout(api_client):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "user first name",
            "last_name": "user last name",
            "email": "user@example.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    token = response.data["access_token"]
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    response = api_client.post(reverse("rest_logout"))

    expected_response = {"detail": "Successfully logged out."}

    assert response.status_code == 200
    assert response.data == expected_response


@pytest.mark.django_db
def test_verify_token(api_client):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "user first name",
            "last_name": "user last name",
            "email": "user@example.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    token = response.data["access_token"]

    response = api_client.post(reverse("rest_verify_token"), data={"token": token})

    assert response.status_code == 200
    assert response.data == {}


@pytest.mark.django_db
def test_verify_token_invalid(api_client):
    response = api_client.post(reverse("rest_verify_token"), data={"token": "invalidtoken"})

    assert response.status_code == 401
    assert not response.data.get("access_token")


@pytest.mark.django_db
def test_refresh_token(api_client):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "user first name",
            "last_name": "user last name",
            "email": "user@example.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    token = response.data["refresh_token"]

    response = api_client.post(reverse("rest_refresh_token"), data={"refresh": token})

    assert response.status_code == 200
    assert "access" in response.data
    assert "refresh" in response.data


@pytest.mark.django_db
def test_refresh_token_invalid(api_client):
    response = api_client.post(reverse("rest_refresh_token"), data={"token": "invalidtoken"})

    assert response.status_code == 400
    assert not response.data.get("access")


@pytest.mark.django_db
def test_admin_panel_login_success(api_client):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "user first name",
            "last_name": "user last name",
            "email": "user@example.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    assert response.status_code == 201

    user = User.objects.get(email="user@example.com")
    user.is_teacher = True
    user.save()

    response = api_client.post(
        reverse("admin_panel_login"),
        data={"email": "user@example.com", "password": "1234example1234"},
    )

    assert "access_token" in response.data
    assert response.status_code == 200


@pytest.mark.django_db
def test_admin_panel_login_not_permitted(api_client):
    response = api_client.post(
        reverse("rest_register"),
        data={
            "first_name": "user first name",
            "last_name": "user last name",
            "email": "user@example.com",
            "password1": "1234example1234",
            "password2": "1234example1234",
        },
    )

    assert response.status_code == 201

    response = api_client.post(
        reverse("admin_panel_login"),
        data={"email": "user@example.com", "password": "1234example1234"},
    )

    assert response.data["detail"] == "Only teacher is allowed to login."
    assert response.status_code == 400
