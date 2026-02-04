from rest_framework import serializers
from .models import CaptureSession, AIInteraction, Profile
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['tier', 'screenshots_today', 'last_reset_date']

class AIInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIInteraction
        fields = ['id', 'prompt', 'answer', 'thought_process', 'mode', 'model_used', 'created_at']

class CaptureSessionSerializer(serializers.ModelSerializer):
    interactions = AIInteractionSerializer(many=True, read_only=True)
    
    class Meta:
        model = CaptureSession
        fields = ['id', 'user', 'image_url', 'captured_at', 'interactions']
