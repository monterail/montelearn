from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import UserView


router = DefaultRouter()

app_urls = [path("me/", UserView.as_view(), name="me")]

app_name = "user"
urlpatterns = app_urls + router.urls
