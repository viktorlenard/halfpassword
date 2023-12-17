from django.http import JsonResponse
# from django.shortcuts import render
# from django.shortcuts import render
# from rest_framework.response import Response
# from rest_framework.decorators import api_view

# @api_view(['GET'])
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
    return JsonResponse(routes, safe=False) 
