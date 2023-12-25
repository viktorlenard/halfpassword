from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('passwords/', views.getPasswords, name="passwords"),
    path('generate/', views.generatePassword, name="generate-password"),
    path('passwords/<str:pk>/update/', views.updatePassword, name="update-password"),
    path('passwords/<str:pk>/delete/', views.deletePassword, name="delete-password"),
    path('passwords/<str:pk>/', views.getPassword, name="password"),
]