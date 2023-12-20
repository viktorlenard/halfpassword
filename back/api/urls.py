from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('passwords/', views.getPasswords, name="passwords"),
    path('passwords/<str:pk>/', views.getPassword, name="password"),
    path('generate/', views.generatePassword, name="generate-password"),
]