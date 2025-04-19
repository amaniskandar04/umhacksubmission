import firebase_admin
from firebase_admin import credentials, auth
from rest_framework.response import Response
import os
from rest_framework import status

cred_path = os.path.join(os.path.dirname(__file__), 'firebase_cred.json')

if not firebase_admin._apps:
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)


def firebase_auth_required(view_func):
    def wrapper(request, *args, **kwargs):
        id_token = request.headers.get('Authorization')
        if not id_token:
            return Response({"error": "Authorization header missing"}, status=status.HTTP_401_UNAUTHORIZED)

        id_token = id_token.split(' ')[1] if ' ' in id_token else id_token
        try:
            decoded_token = auth.verify_id_token(id_token)
            request.user_firebase = decoded_token
        except Exception as e:
            return Response({"error": f"Invalid token: {str(e)}"}, status=status.HTTP_401_UNAUTHORIZED)

        return view_func(request, *args, **kwargs)
    return wrapper