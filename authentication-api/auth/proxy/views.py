from django.conf import settings

from rest_framework.permissions import IsAuthenticated

from ..core.permissions import IsTeacher
from .helpers import CustomProxyView


class PermissionClassesMixin:
    def get_permissions(self):
        if self.request.method == "GET":
            permission_classes = (IsAuthenticated,)
        else:
            permission_classes = (IsTeacher,)
        return [permission() for permission in permission_classes]


class ProxyLessonListView(PermissionClassesMixin, CustomProxyView):
    http_method_names = ["get", "post"]
    proxy_host = settings.LESSON_API_HOST
    source = "api/lesson/"


class ProxyLessonDetailView(PermissionClassesMixin, CustomProxyView):
    http_method_names = ["get", "put", "patch", "delete"]
    proxy_host = settings.LESSON_API_HOST
    source = "api/lesson/%(uuid)s/"


class ProxyTestsListView(PermissionClassesMixin, CustomProxyView):
    http_method_names = ["get", "post"]
    proxy_host = settings.TESTS_API_HOST
    source = "api/tests/"


class ProxyTestsDetailView(PermissionClassesMixin, CustomProxyView):
    http_method_names = ["get", "put", "delete"]
    proxy_host = settings.TESTS_API_HOST
    source = "api/tests/%(uuid)s/"
