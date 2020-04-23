from django.conf import settings

from rest_framework.permissions import IsAdminUser, IsAuthenticated

from .helpers import CustomProxyView


class PermissionClassesMixin:
    def get_permissions(self):
        if self.request.method == "GET":
            permission_classes = (IsAuthenticated,)
        else:
            permission_classes = (IsAdminUser,)
        return [permission() for permission in permission_classes]


class ProxyLessonListView(PermissionClassesMixin, CustomProxyView):
    http_method_names = ["get", "post"]
    proxy_host = settings.LESSON_API_HOST
    source = "api/lesson/"


class ProxyLessonDetailView(PermissionClassesMixin, CustomProxyView):
    http_method_names = ["get", "put", "patch", "delete"]
    proxy_host = settings.LESSON_API_HOST
    source = "api/lesson/%(uuid)s/"
