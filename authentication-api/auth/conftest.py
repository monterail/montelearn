import pytest

from rest_framework.test import APIClient

from .user.tests.factories import UserFactory


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def authenticated_api_client():
    class APIClientWithUser(APIClient):
        user = UserFactory()

    client = APIClientWithUser()
    client.force_authenticate(user=client.user)
    return client


@pytest.fixture
def authenticated_admin_client():
    class AdminClient(APIClient):
        user = UserFactory(is_staff=True)

    client = AdminClient()
    client.force_authenticate(user=client.user)
    return client
