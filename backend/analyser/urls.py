from django.urls import path
from . import views

urlpatterns = [
    path('test-gemini/', views.test_gemini, name='test_gemini'),
    path('describe-image/', views.describe_image, name='test_image'),
]