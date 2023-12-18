from rest_framework.serializers import ModelSerializer
from .models import Password

class PasswordSerializer(ModelSerializer):
    class Meta:
        model = Password
        fields = '__all__'