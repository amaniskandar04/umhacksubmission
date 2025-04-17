from django.shortcuts import render
from .forms import UploadForm
from .utils import process_file

from rest_framework.response import Response
from rest_framework.decorators import api_view
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

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, Waqf API!"})

def upload_view(request):
    description = None
    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            upload = form.save()
            description = process_file(upload.file.path)
    else:
        form = UploadForm()
    return render(request, 'analyzer/upload.html', {'form': form, 'description': description})