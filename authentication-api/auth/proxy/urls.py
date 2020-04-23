from django.urls import path

from .views import ProxyLessonDetailView, ProxyLessonListView


app_name = "proxy"

urlpatterns = [
    path("lesson/", ProxyLessonListView.as_view(), name="lesson-list"),
    path("lesson/<str:uuid>/", ProxyLessonDetailView.as_view(), name="lesson-detail"),
]
