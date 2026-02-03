import stripe
import os
from django.conf import settings
from .models import Profile
from django.contrib.auth.models import User

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

class BillingService:
    @staticmethod
    def create_checkout_session(user):
        try:
            checkout_session = stripe.checkout.Session.create(
                customer_email=user.email,
                payment_method_types=['card'],
                line_items=[
                    {
                        'price': os.getenv('STRIPE_PREMIUM_PRICE_ID'),
                        'quantity': 1,
                    },
                ],
                mode='subscription',
                success_url=os.getenv('STRIPE_SUCCESS_URL'),
                cancel_url=os.getenv('STRIPE_CANCEL_URL'),
                metadata={'user_id': user.id}
            )
            return session.url
        except Exception as e:
            print(f"Stripe Error: {e}")
            return None

    @staticmethod
    def handle_webhook(payload, sig_header):
        """
        Handles Stripe webhooks for subscription updates.
        """
        event = None
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except ValueError as e:
            return False
        except stripe.error.SignatureVerificationError as e:
            return False

        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            user_id = session['metadata']['user_id']
            profile = Profile.objects.get(user_id=user_id)
            profile.tier = 'premium'
            profile.save()
            
        return True
