from rest_framework.serializers import ModelSerializer
from .models import Password

class EntrySerializer(ModelSerializer):
    class Meta:
        model = Password
        fields = ('id', 'user', 'name', 'created', 'updated', 'tags') # Only sending the data absolutely necessary

class PasswordSerializer(ModelSerializer):
    class Meta:
        model = Password
        fields = '__all__'