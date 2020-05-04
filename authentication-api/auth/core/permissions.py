from rest_framework import permissions


class IsTeacher(permissions.BasePermission):
    message = "Only teacher is allowed to perform this action."

    def has_permission(self, request, view):
        return request.user.is_teacher
