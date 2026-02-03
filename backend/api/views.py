from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import CaptureSession, AIInteraction, Profile
from .serializers import CaptureSessionSerializer, AIInteractionSerializer, ProfileSerializer
from services.ai_service import AIService
from .billing_service import BillingService
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import HttpResponse
import stripe

class AIChatView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        """
        Endpoint to handle AI requests.
        Payload: { "prompt": "...", "mode": "fast/think", "session_id": optional }
        """
        prompt = request.data.get('prompt')
        mode = request.data.get('mode', 'fast')
        session_id = request.data.get('session_id')
        
        if not prompt:
            return Response({"error": "Prompt is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        # Get or create session
        if session_id:
            try:
                session = CaptureSession.objects.get(id=session_id, user=request.user)
            except CaptureSession.DoesNotExist:
                return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            session = CaptureSession.objects.create(user=request.user)
            
        # Call AI Service
        ai_service = AIService()
        ai_response = ai_service.get_ai_response(prompt, mode=mode)
        
        if "error" in ai_response:
            return Response(ai_response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        # Increment usage
        profile = request.user.profile
        profile.screenshots_today += 1
        profile.save()
            
        # Save Interaction
        interaction = AIInteraction.objects.create(
            session=session,
            prompt=prompt,
            answer=ai_response['answer'],
            thought_process=ai_response['thought_process'],
            mode=mode,
            model_used=ai_response['model']
        )
        
        serializer = AIInteractionSerializer(interaction)
        return Response({
            "session_id": session.id,
            "interaction": serializer.data,
            "usage": {
                "today": profile.screenshots_today,
                "tier": profile.tier,
                "limit": 5 if profile.tier == 'free' else "unlimited"
            }
        }, status=status.HTTP_201_CREATED)

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

class HistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        sessions = CaptureSession.objects.filter(user=request.user).order_by('-captured_at')
        serializer = CaptureSessionSerializer(sessions, many=True)
        return Response(serializer.data)

class SessionDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, pk):
        try:
            session = CaptureSession.objects.get(pk=pk, user=request.user)
            serializer = CaptureSessionSerializer(session)
            return Response(serializer.data)
        except CaptureSession.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class CreateCheckoutSessionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        checkout_url = BillingService.create_checkout_session(request.user)
        if checkout_url:
            return Response({"checkout_url": checkout_url})
        return Response({"error": "Could not create checkout session"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@method_decorator(csrf_exempt, name='dispatch')
class StripeWebhookView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        
        if BillingService.handle_webhook(payload, sig_header):
            return HttpResponse(status=200)
        return HttpResponse(status=400)
