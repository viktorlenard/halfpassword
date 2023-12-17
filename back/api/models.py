from django.db import models
from django.conf import settings
from django_cryptography.fields import encrypt


"""
Data is encrypted using the django_cryptography library.
Name and ciphertext are required fields, rest are all optional. 
"""
class Password(models.Model):
    blue = "blue"
    red = "red"
    green = "green"
    yellow = "yellow"
    purple = "purple"
    pw_tags = [
        (blue,"blue"),
        (red, "red"),
        (green, "green"),
        (yellow, "yellow"),
        (purple, "purple"),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name='user_passwords')
    name = models.CharField(max_length=64) # Required
    username = models.CharField(max_length=1000, null=True, blank=True)
    ciphertext = encrypt(models.CharField(max_length=1000)) # Required, encrypted
    url = models.CharField(max_length=64, blank=True)
    tags = models.CharField(max_length=10, choices=pw_tags, null=True, blank=True)
    comment = encrypt(models.CharField(max_length=1000, null=True, blank=True)) # Encrypted
    def __str__(self):
        return f"{self.user} ({self.name})"