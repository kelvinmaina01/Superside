from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status
import json

class UsageLimitMiddleware:
    """
    Middleware to check if the user has exceeded their daily screenshot limit.
    Only applicable for AI chat endpoints.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/api/v1/chat/') and request.method == 'POST':
            if request.user.is_authenticated:
                profile = request.user.profile
                
                # Reset counts if it's a new day
                if profile.last_reset_date != timezone.now().date():
                    profile.screenshots_today = 0
                    profile.last_reset_date = timezone.now().date()
                    profile.save()
                
                # Check limits
                if profile.tier == 'free' and profile.screenshots_today >= 5:
                    return self._error_response("Daily limit of 5 screenshots reached. Please upgrade to Premium for unlimited access.")
            
        response = self.get_response(request)
        return response

    def _error_response(self, message):
        from django.http import JsonResponse
        return JsonResponse({"error": message, "code": "LIMIT_REACHED"}, status=403)
