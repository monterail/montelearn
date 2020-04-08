from rest_framework.generics import RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer


class UserView(RetrieveDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user
