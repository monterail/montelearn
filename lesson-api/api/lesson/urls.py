from rest_framework.routers import DefaultRouter

from .views import GradeViewSet, LessonViewSet, SubjectViewSet


app_name = "lesson"

router = DefaultRouter()
router.register("lesson", LessonViewSet, "lesson")
router.register("grade", GradeViewSet, "grade")
router.register("subject", SubjectViewSet, "subject")

urlpatterns = router.urls
