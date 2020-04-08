from rest_framework.routers import DefaultRouter


# Extend this router with your own routes
# E.g.: router.registry.extend(your_router.registry)
router = DefaultRouter()

app_urls = []

app_name = "core"
urlpatterns = app_urls + router.urls
