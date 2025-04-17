from PIL import Image
import google.generativeai as genai
import io

YOUR_GEMINI_API_KEY = "AIzaSyCVjbqv-kjeY_QViT2BzrhJZ1RwGX2Xd_U"
genai.configure(api_key=YOUR_GEMINI_API_KEY)




def ask_gemini(prompt):
    model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
    response = model.generate_content(prompt)
    return response.text

def describe_image_from_file(image_file):
    image = Image.open(image_file)
    model = genai.GenerativeModel("models/gemini-1.5-flash")
    response = model.generate_content([
        "Describe the contents of this image in detail.",
        image
    ])
    return response.text