from django.conf import settings

from rest_framework.permissions import IsAuthenticated

from ..core.permissions import IsTeacher
from ..user.models import Score
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


class ProxyTestsAdminListView(CustomProxyView):
    http_method_names = ["get", "post"]
    proxy_host = settings.TESTS_API_HOST
    source = "api/admin/tests/"
    permission_classes = (IsTeacher,)


class ProxyTestsAdminDetailView(CustomProxyView):
    http_method_names = ["get", "put", "delete"]
    proxy_host = settings.TESTS_API_HOST
    source = "api/admin/tests/%(uuid)s/"
    permission_classes = (IsTeacher,)


class ProxyTestsListView(CustomProxyView):
    http_method_names = ["get"]
    proxy_host = settings.TESTS_API_HOST
    source = "api/tests/"


class ProxyTestsDetailView(CustomProxyView):
    http_method_names = ["get"]
    proxy_host = settings.TESTS_API_HOST
    source = "api/tests/%(uuid)s/"


class ProxyGradeListView(PermissionClassesMixin, CustomProxyView):
    http_method_names = ["get", "post"]
    proxy_host = settings.LESSON_API_HOST
    source = "api/grade/"


class ProxySubjectListView(PermissionClassesMixin, CustomProxyView):
    http_method_names = ["get", "post"]
    proxy_host = settings.LESSON_API_HOST
    source = "api/subject/"


class ProxyTestsScoreDetailView(CustomProxyView):
    http_method_names = ["post"]
    proxy_host = settings.TESTS_API_HOST
    source = "api/tests/%(uuid)s/scores/"

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 201:
            score_list = response.data.get("score").split("/")
            Score.objects.create(
                score=score_list[0],
                max_score=score_list[1],
                test_uuid=kwargs["uuid"],
                user=request.user,
            )
        return response
