from PIL import Image
import google.generativeai as genai
import io

YOUR_GEMINI_API_KEY = ""
genai.configure(api_key=YOUR_GEMINI_API_KEY)

model = genai.GenerativeModel(model_name="models/gemini-pro")
vision_model = genai.GenerativeModel("gemini-pro-vision")

def ask_gemini(prompt):
    response = model.generate_content(prompt)
    return response.text

def ask_gemini_image(image_path):
    with open(image_path, "rb") as f:
        image_data = f.read()
    response = vision_model.generate_content(["What's in this image?", image_data])
    return response.text