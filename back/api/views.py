from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Password
from .serializers import PasswordSerializer, PasswordSerializer_Safe, PasswordHistorySerializer, MyTokenObtainPairSerializer # DB 2.0
from .utils import request_validator, password_generator
from django.http import Http404
from django.db.models.functions import Collate # For case insensitive sorting
# from rest_framework_simplejwt.views import TokenObtainPairView

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of password objects'
        },
        {
            'Endpoint': '/passwords/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single password object'
        },
        {
            'Endpoint': '/passwords/create/',
            'method': 'POST',
            'body': {
                'name': "",
                'username': "",
                'ciphertext': "",
                'url': "",
                'tags': "",
                'comment': "",
            },
            'description': 'Creates new password with data sent in post request'
        },
        {
            'Endpoint': '/passwords/id/update/',
            'method': 'PUT',
            'body': {
                'name': "",
                'username': "",
                'ciphertext': "",
                'url': "",
                'tags': "",
                'comment': "",
            },
            'description': 'Updates an existing password with data sent in post request'
        },
        {
            'Endpoint': '/passwords/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting password'
        },
        {
            'Endpoint': '/generate/',
            'method': 'POST',
            'body': {
                'readable': '',
                'length': '',
                'div': '',
                'caps': '',
                'nums': '',
            },
            'description': 'Generates a new password with data sent in post request'
        },
        {
            'Endpoint': '/token/',
            'method': '?',
            'body': {
                'username': "",
                'email': "",
                'password': "",
                'confirm_password': ""
            },
            'description': '?',
        },
        {
            'Endpoint': '/token/refresh/',
            'method': '?',
            'body': {
                'username': "",
                'email': "",
                'password': "",
                'confirm_password': ""
            },
            'description': '?',
        },
        {
            'Endpoint': '/register/',
            'method': 'POST',
            'body': {
                'username': "",
                'email': "",
                'password': "",
                'confirm_password': ""
            },
            'description': 'Registers a new user',
        },
        {
            'Endpoint': '/login/',
            'method': 'POST',
            'body': {
                'username': "",
                'password': "",
            },
            'description': 'Authenticates a user and returns an auth token',
        },
        {
            'Endpoint': '/logout/',
            'method': 'POST',
            'body': None,
            'description': 'Logs out a user and deletes their auth token',
        }
    ]
    return Response(routes) 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPasswords(request):
    user = request.user # Gets the user from the request
    passwords = Password.objects.filter(user=user).annotate(name_ci=Collate('name', 'nocase')).order_by('name_ci') # Gets all the passwords from the database and sorts them alphabetically by name
    serializer = PasswordSerializer_Safe(passwords, many=True) # Serializes the query set into a json object. Many=True because there are many objects in the query set
    return Response(serializer.data) # Returns the serialized data. serilazer is a json object. serializer.data is the data inside the json object

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPassword(request, pk): # pk is the primary key of the password object
    user = request.user # Gets the user from the request
    try:
        password = Password.objects.get(id=pk, user=user) # Gets a single password object from the database
    except Password.DoesNotExist:
        raise Http404("Password does not exist")
    serializer = PasswordSerializer(password) # Use the new serializer
    return Response(serializer.data) # Returns the serialized data

@api_view(['PUT'])
def updatePassword(request, pk):
    data = request.data
    password = Password.objects.get(id=pk)
    password_serializer = PasswordSerializer(instance=password, data=data)
    if password_serializer.is_valid():
        password_serializer.save()
        latest_password = password.password_history.order_by('-created').first() # Get the latest password in the history
        if latest_password is None or data['history'][0]['password'] != latest_password.password: # Only save the new password if it's different from the latest password
            history_data = {
                'password': data['history'][0]['password'],
                'entry': password.id
            } # Create a new PasswordHistory instance
            history_serializer = PasswordHistorySerializer(data=history_data)
            if history_serializer.is_valid():
                history_serializer.save()
                return Response({
                    'password': password_serializer.data,
                    'history': history_serializer.data
                })
            else:
                return Response(history_serializer.errors, status=400)
        else:
            return Response(password_serializer.data)
    else:
        return Response(password_serializer.errors, status=400)
    
@api_view(['DELETE'])
def deletePassword(request, pk):
    password = Password.objects.get(id=pk)
    password.delete()
    return Response('Entry deleted')

@api_view(['POST'])
def createPassword(request):
    data = request.data
    password_serializer = PasswordSerializer(data=data)
    if password_serializer.is_valid():
        password = password_serializer.save()
        history_data = {
            'password': data['history'][0]['password'],
            'entry': password.id # This is the id of the password object that was just created
        } # Create a new PasswordHistory instance
        history_serializer = PasswordHistorySerializer(data=history_data)
        if history_serializer.is_valid():
            history_serializer.save()
            return Response({
                'password': password_serializer.data,
                'history': history_serializer.data
            })
        else:
            return Response(history_serializer.errors, status=400)
    else:
        return Response(password_serializer.errors, status=400)
'''
OLD CODE - FOR COMPARISON ONLY
@api_view(['POST'])
def createPassword(request):
    data = request.data
    serializer = PasswordSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors) # DEBUGGING, very useful!
        return Response(serializer.errors, status=400)
'''

@api_view(['POST'])
def generatePassword(request):
    data = request.data # Gets the data from the request
    password_request = {
        'human': data.get('human'),
        'length': int(data.get('length')),
        'div': data.get('div'),
        'caps': data.get('caps'),
        'nums': data.get('nums'),
        'valid': None
    } # Sanitizes the data, puts it into a dict.
    request_validator(password_request) # Validates the request
    if password_request['valid'] != True:
        return Response('Invalid request') # Returns an error if the request is invalid
    password = password_generator(password_request)  # Generates the password
    return Response(password)