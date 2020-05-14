from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .helpers import LessonFilter
from .models import Grade, Lesson, Subject
from .serializers import GradeSerializer, LessonSerializer, SubjectSerializer


class LessonViewSet(ModelViewSet):
    lookup_field = "uuid"
    serializer_class = LessonSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (AllowAny,)
    queryset = Lesson.objects.all()
    parser_classes = (MultiPartParser,)
    filterset_class = LessonFilter


class GradeViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    serializer_class = GradeSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (AllowAny,)
    queryset = Grade.objects.all()


class SubjectViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    serializer_class = SubjectSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (AllowAny,)
    queryset = Subject.objects.all()
