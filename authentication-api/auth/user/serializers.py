from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import Score


class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ("pk", "test_uuid", "score", "max_score")


class UserSerializer(serializers.ModelSerializer):
    scores = ScoreSerializer(source="score_set", read_only=True, many=True)

    class Meta:
        model = get_user_model()
        fields = ("pk", "email", "first_name", "last_name", "is_teacher", "scores")
