from django_filters.rest_framework import BaseInFilter, CharFilter, FilterSet

from .models import Lesson


class CharInFilter(BaseInFilter, CharFilter):
    pass


class LessonFilter(FilterSet):
    uuid__in = CharInFilter(field_name="uuid", lookup_expr="in")
    grade__in = CharInFilter(field_name="grade", lookup_expr="in")
    subject__in = CharInFilter(field_name="subject", lookup_expr="in")

    class Meta:
        model = Lesson
        fields = (
            "uuid__in",
            "grade__in",
            "subject__in",
        )
