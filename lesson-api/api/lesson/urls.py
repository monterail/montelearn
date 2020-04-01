from rest_framework.routers import DefaultRouter

from .views import LessonViewSet


app_name = "lesson"

lesson_router = DefaultRouter()
lesson_router.register("lesson", LessonViewSet, "lesson")

urlpatterns = lesson_router.urls
