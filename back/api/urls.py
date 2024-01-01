from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('passwords/', views.getPasswords, name="passwords"),
    path('passwords/create/', views.createPassword, name="create-passwords"),
    path('generate/', views.generatePassword, name="generate-password"),
    path('passwords/<str:pk>/update/', views.updatePassword, name="update-password"),
    path('passwords/<str:pk>/delete/', views.deletePassword, name="delete-password"),
    path('passwords/<str:pk>/', views.getPassword, name="password"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.registerUser, name="register-user")
]