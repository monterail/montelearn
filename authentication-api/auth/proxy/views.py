from django.conf import settings

from rest_framework.permissions import IsAuthenticated

from .helpers import CustomProxyView


class ProxyLessonListView(CustomProxyView):
    permission_classes = (IsAuthenticated,)
    http_method_names = ["get", "post"]
    proxy_host = settings.LESSON_API_HOST
    source = "api/lesson/"


class ProxyLessonDetailView(CustomProxyView):
    permission_classes = (IsAuthenticated,)
    http_method_names = ["get", "put", "patch", "delete"]
    proxy_host = settings.LESSON_API_HOST
    source = "api/lesson/%(uuid)s/"
