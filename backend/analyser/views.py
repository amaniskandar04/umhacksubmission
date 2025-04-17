from django.shortcuts import render
from .utils import process_file
from django.http import HttpResponse
from .gemini import ask_gemini
from .forms import UploadForm

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

def test_gemini(request):
    prompt = "Summarize the benefits of using Django with Google Gemini."
    result = ask_gemini(prompt)
    return HttpResponse(f"<h2>Gemini Response:</h2><p>{result}</p>")