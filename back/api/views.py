from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Password
from .serializers import PasswordSerializer, EntrySerializer
from .utils import request_validator, password_generator 

import logging # DEBUGGING
logger = logging.getLogger(__name__) # DEBUGGING

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/',
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
    passwords = Password.objects.all().order_by('name') # This is a query set of all the passwords. Can't be passed directly to the response. Need to serialize it first
    serializer = EntrySerializer(passwords, many=True) # Serializes the query set into a json object. Many=True because there are many objects in the query set
    return Response(serializer.data) # Returns the serialized data. serilazer is a json object. serializer.data is the data inside the json object

@api_view(['GET'])
def getPassword(request, pk): # pk is the primary key of the password object
    password = Password.objects.get(id=pk) # Gets a single password object from the database
    serializer = PasswordSerializer(password, many=False) # many=False because there is only one object
    return Response(serializer.data)

@api_view(['PUT'])
def updatePassword(request, pk):
    data = request.data
    password = Password.objects.get(id=pk)
    serializer = PasswordSerializer(instance=password, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors) # DEBUGGING, very useful!
        return Response(serializer.errors, status=400)
    
@api_view(['DELETE'])
def deletePassword(request, pk):
    password = Password.objects.get(id=pk)
    password.delete()
    return Response('Entry deleted')

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