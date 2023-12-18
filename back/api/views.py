from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Password
from .serializers import PasswordSerializer 

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/passwords/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of passwords'
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
            'description': 'Creates an existing password with data sent in post request'
        },
        {
            'Endpoint': '/passwords/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting password'
        },
        # This might change , not sure how to implement it yet
        {
            'Endpoint': '/passwords/generate/',
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
                'email': "",
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
def getPasswords(request):
    passwords = Password.objects.all() # This is a query set of all the passwords. Can't be passed directly to the response. Need to serialize it first
    serializer = PasswordSerializer(passwords, many=True) # Serializes the query set into a json object. Many=True because there are many objects in the query set
    return Response(serializer.data) # Returns the serialized data. serilazer is a json object. serializer.data is the data inside the json object

@api_view(['GET'])
def getPassword(request, pk): # pk is the primary key of the password object
    password = Password.objects.get(id=pk) # Gets a single password object from the database
    serializer = PasswordSerializer(password, many=False) # many=False because there is only one object
    return Response(serializer.data)