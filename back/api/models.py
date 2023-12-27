from django.db import models
from django.conf import settings
from django_cryptography.fields import encrypt


# DB 2.0
 
class Password(models.Model):
    # Tuple of choices for tags. First value is stored in db, second is displayed in admin panel
    tag = [
        ("blue", "blue"),
        ("red", "red"),
        ("green", "green"),
        ("yellow", "yellow"),
        ("purple", "purple"),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name='user_passwords')
    name = models.CharField(max_length=64) # Required
    username = models.CharField(max_length=1000, null=True, blank=True)
    is_favorite = models.BooleanField(default=False) # NEW FIELD
    url = models.CharField(max_length=64, blank=True)
    tags = models.CharField(max_length=10, choices=tag, null=True, blank=True)
    comment = encrypt(models.TextField(null=True, blank=True)) # Encrypted
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.user} ({self.name})"

class PasswordHistory(models.Model):
    entry = models.ForeignKey(Password, on_delete=models.CASCADE, related_name='password_history')
    password = encrypt(models.CharField(max_length=1000)) # Encrypted
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.entry.name} ({self.created})"


'''
# DB 1.0

class Password(models.Model):
    # Tuple of choices for tags. First value is stored in db, second is displayed in admin panel
    pw_tags = [
        ("blue", "blue"),
        ("red", "red"),
        ("green", "green"),
        ("yellow", "yellow"),
        ("purple", "purple"),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name='user_passwords')
    name = models.CharField(max_length=64) # Required
    username = models.CharField(max_length=1000, null=True, blank=True)
    ciphertext = encrypt(models.CharField(max_length=1000)) # Required, encrypted
    url = models.CharField(max_length=64, blank=True)
    tags = models.CharField(max_length=10, choices=pw_tags, null=True, blank=True)
    comment = encrypt(models.TextField(null=True, blank=True)) # Encrypted
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.user} ({self.name})"'''