import pytesseract
from PIL import Image
import mimetypes
from .gemini import ask_gemini

def process_file(file_path):
    mime_type, _ = mimetypes.guess_type(file_path)

    if mime_type.startswith('image'):
        # Try OCR first
        text = pytesseract.image_to_string(Image.open(file_path))
        prompt = f"What is this document about?\n\n{text}"
        return ask_gemini(prompt)
    else:
        return "Unsupported file type"