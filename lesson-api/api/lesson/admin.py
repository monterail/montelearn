from django.contrib import admin

from .models import Lesson


class LessonAdmin(admin.ModelAdmin):
    fields = ("name", "description", "pdf_file")
    readonly_fields = ("uuid",)

    class Meta:
        model = Lesson


admin.site.register(Lesson)
