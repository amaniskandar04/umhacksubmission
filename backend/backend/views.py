from django.shortcuts import render
import pyrebase

config={
    "apiKey": "AIzaSyCfNtGzbKeq8SO49Wzx9hoCllA9AuVtQO8",
    "authDomain": "umhack2025-50892.firebaseapp.com",
    "databaseURL": "https://umhack2025-50892-default-rtdb.asia-southeast1.firebasedatabase.app",
    "projectId": "umhack2025-50892",
    "storageBucket": "umhack2025-50892.firebasestorage.app",
    "messagingSenderId": "11218868557",
    "appId": "1:11218868557:web:dd0ee7de54e93296dfff04",
    "measurementId": "G-P3ZS08R579"
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
database = firebase.database()

