from .views import AIChatView, HistoryView, SessionDetailView, CreateCheckoutSessionView, StripeWebhookView

urlpatterns = [
    path('chat/', AIChatView.as_view(), name='ai-chat'),
    path('history/', HistoryView.as_view(), name='history'),
    path('sessions/<int:pk>/', SessionDetailView.as_view(), name='session-detail'),
    path('billing/checkout/', CreateCheckoutSessionView.as_view(), name='checkout'),
    path('billing/webhook/', StripeWebhookView.as_view(), name='stripe-webhook'),
]
