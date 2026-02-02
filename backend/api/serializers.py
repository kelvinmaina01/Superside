from rest_framework import serializers
from .models import CaptureSession, AIInteraction
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class AIInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIInteraction
        fields = ['id', 'prompt', 'answer', 'thought_process', 'mode', 'model_used', 'created_at']

class CaptureSessionSerializer(serializers.ModelSerializer):
    interactions = AIInteractionSerializer(many=True, read_only=True)
    
    class Meta:
        model = CaptureSession
        fields = ['id', 'user', 'image_url', 'captured_at', 'interactions']
