from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    TIER_CHOICES = [
        ('free', 'Free'),
        ('premium', 'Premium'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    tier = models.CharField(max_length=10, choices=TIER_CHOICES, default='free')
    stripe_customer_id = models.CharField(max_length=100, null=True, blank=True)
    screenshots_today = models.IntegerField(default=0)
    last_reset_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.tier}"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class CaptureSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='captures')
    image_url = models.URLField(max_length=500, null=True, blank=True)
    captured_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Capture by {self.user.username} at {self.captured_at}"

class AIInteraction(models.Model):
    MODE_CHOICES = [
        ('fast', 'Fast Mode'),
        ('think', 'Thinking Mode'),
    ]
    
    session = models.ForeignKey(CaptureSession, on_delete=models.CASCADE, related_name='interactions')
    prompt = models.TextField()
    answer = models.TextField()
    thought_process = models.TextField(null=True, blank=True)
    mode = models.CharField(max_length=10, choices=MODE_CHOICES)
    model_used = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.mode.capitalize()} Interaction for Session {self.session.id}"
