from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet

from .models import Lesson
from .serializers import LessonSerializer


class LessonViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    lookup_field = "uuid"
    serializer_class = LessonSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (AllowAny,)
    queryset = Lesson.objects.all()
