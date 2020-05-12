from django.urls import path

from .views import (
    ProxyGradeListView,
    ProxyLessonDetailView,
    ProxyLessonListView,
    ProxySubjectListView,
    ProxyTestsAdminDetailView,
    ProxyTestsAdminListView,
    ProxyTestsDetailView,
    ProxyTestsListView,
)


app_name = "proxy"

urlpatterns = [
    path("lesson/", ProxyLessonListView.as_view(), name="lesson-list"),
    path("lesson/<str:uuid>/", ProxyLessonDetailView.as_view(), name="lesson-detail"),
    path("admin/tests/", ProxyTestsAdminListView.as_view(), name="tests-admin-list"),
    path("admin/tests/<str:uuid>/", ProxyTestsAdminDetailView.as_view(), name="tests-admin-detail"),
    path("tests/", ProxyTestsListView.as_view(), name="tests-list"),
    path("tests/<str:uuid>/", ProxyTestsDetailView.as_view(), name="tests-detail"),
    path("subject/", ProxySubjectListView.as_view(), name="subject-list"),
    path("grade/", ProxyGradeListView.as_view(), name="grade-list"),
]
