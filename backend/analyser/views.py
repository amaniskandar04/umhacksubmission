from django.shortcuts import render
from .utils import process_file
from django.http import HttpResponse
from . import gemini
from .forms import UploadForm
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

# Create your views here.
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

@csrf_exempt
def test_gemini(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        prompt = data.get("prompt", "Say something nice about Django.")
        response = gemini.ask_gemini(prompt)
        return JsonResponse({"response": response})
    return JsonResponse({"error": "Send a POST request with a prompt."}, status=400)

@csrf_exempt
def describe_image(request):
    if request.method == 'POST' and request.FILES.get('image'):
        description = gemini.describe_image_from_file(request.FILES['image'])
        return JsonResponse({"description": description})
    return JsonResponse({"error": "Upload an image with POST request."}, status=400)
