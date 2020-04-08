from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _

from . import models


class UserAdmin(DjangoUserAdmin):

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name")}),
        (
            _("Permissions"),
            {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")},
        ),
        (_("Important dates"), {"fields": ("last_login", "created", "modified")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "first_name", "last_name"),
            },
        ),
    )
    list_display = ("email", "first_name", "last_name", "is_staff", "created", "modified")
    search_fields = ("pk", "email", "first_name", "last_name")
    ordering = ("email",)
    readonly_fields = ("created", "modified")


admin.site.register(models.User, UserAdmin)
