from django.urls import path

from .views import (
    ProxyLessonDetailView,
    ProxyLessonListView,
    ProxyTestsDetailView,
    ProxyTestsListView,
)


app_name = "proxy"

urlpatterns = [
    path("lesson/", ProxyLessonListView.as_view(), name="lesson-list"),
    path("lesson/<str:uuid>/", ProxyLessonDetailView.as_view(), name="lesson-detail"),
    path("tests/", ProxyTestsListView.as_view(), name="tests-list"),
    path("tests/<str:uuid>/", ProxyTestsDetailView.as_view(), name="tests-detail"),
]
