from django.contrib import admin
from .models import Password, PasswordHistory

# Register your models here.

admin.site.register(Password)
admin.site.register(PasswordHistory)