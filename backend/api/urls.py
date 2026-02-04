from django.urls import path
from .views import ProfileView, AIChatView, AnalyzeScreenshotView, HistoryView, SessionDetailView, CreateCheckoutSessionView, StripeWebhookView

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('chat/', AIChatView.as_view(), name='ai-chat'),
    path('analyze/', AnalyzeScreenshotView.as_view(), name='analyze-screenshot'),
    path('history/', HistoryView.as_view(), name='history'),
    path('sessions/<int:pk>/', SessionDetailView.as_view(), name='session-detail'),
    path('billing/checkout/', CreateCheckoutSessionView.as_view(), name='checkout'),
    path('billing/webhook/', StripeWebhookView.as_view(), name='stripe-webhook'),
]
