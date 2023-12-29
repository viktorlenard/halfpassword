from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Password, PasswordHistory
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# DB 2.0
class PasswordSerializer(ModelSerializer):
    history = serializers.SerializerMethodField()
    class Meta:
        model = Password
        fields = ['id', 'name', 'username', 'is_favorite', 'url', 'tags', 'comment', 'created', 'updated', 'user', 'history']

    def get_history(self, obj):
        history = PasswordHistory.objects.filter(entry=obj.id)
        return PasswordHistorySerializer(history, many=True).data

class PasswordSerializer_Safe(ModelSerializer):
        class Meta:
            model = Password
            fields = ('id', 'user', 'name', 'created', 'updated', 'tags', 'is_favorite') # Only sending the data absolutely necessary

class PasswordHistorySerializer(ModelSerializer):
        class Meta:
            model = PasswordHistory
            fields = '__all__'

'''
Custom serializer for JWT token customization. Wanted to include the usernae in the token payload.
'''
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


'''
# DB 1.0
class EntrySerializer(ModelSerializer):
    class Meta:
        model = Password
        fields = ('id', 'user', 'name', 'created', 'updated', 'tags') # Only sending the data absolutely necessary

class PasswordSerializer(ModelSerializer):
    class Meta:
        model = Password
        fields = '__all__'
'''