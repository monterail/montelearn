from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from .helpers import LessonFilter
from .models import Lesson
from .serializers import LessonSerializer


class LessonViewSet(ModelViewSet):
    lookup_field = "uuid"
    serializer_class = LessonSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (AllowAny,)
    queryset = Lesson.objects.all()
    parser_classes = (MultiPartParser,)
    filterset_class = LessonFilter
