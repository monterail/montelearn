from rest_framework_proxy.views import ProxyView

from django.conf import settings

from rest_framework.permissions import IsAuthenticated


class ProxyLessonListView(ProxyView):
    permission_classes = (IsAuthenticated,)
    http_method_names = ["get"]
    proxy_host = settings.LESSON_API_HOST
    source = "api/lesson"


class ProxyLessonDetailView(ProxyView):
    permission_classes = (IsAuthenticated,)
    http_method_names = ["get"]
    proxy_host = settings.LESSON_API_HOST
    source = "api/lesson/%(uuid)s"
