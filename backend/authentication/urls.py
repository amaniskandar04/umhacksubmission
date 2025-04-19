from django.urls import path
from . import views

urlpatterns = [
    #Return email 
    path('SignInWithICNumber/', views.SignInWithICNumber, name='SignInWithICNumber'),
    #Return email 
    path('SignInWithPhoneNumber/', views.SignInWithPhoneNumber, name='SignInWithPhoneNumber'),  
    #Return email
    path('SignInWithICAndPhoneNumber/', views.SignInWithICAndPhoneNumber, name='SignInWithICAndPhoneNumber'),


    #Return email and reset link
    path('ForgetPasswordWithICNumber/', views.ForgetPasswordWithICNumber, name='ForgetPasswordWithICNumber'),
    #Return reset link 
    path('ForgetPasswordWithEmail/', views.ForgetPasswordWithEmail, name='ForgetPasswordWithEmail'),

    #Return uid, phonenum 
    path('VerifyTokenPhoneNumberFirebase/', views.VerifyTokenPhoneNumberFirebase, name='VerifyTokenPhoneNumberFirebase'),

    #Return confirmation message
    path('SignUp/', views.SignUp, name='SignUp'),

  
]