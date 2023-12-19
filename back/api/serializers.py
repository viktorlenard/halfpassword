from rest_framework.serializers import ModelSerializer
from .models import Password

class EntrySerializer(ModelSerializer):
    class Meta:
        model = Password
        fields = ('user', 'name', 'created', 'updated') # Only sending the data absolutely necessary

class PasswordSerializer(ModelSerializer):
    class Meta:
        model = Password
        fields = '__all__'