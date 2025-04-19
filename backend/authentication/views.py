from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from backend.firebase import db
from firebase_admin import auth, firestore
from . import firebaseauth # This ensures Firebase is initialized
from .firebaseauth import firebase_auth_required

# Create your views here.
@api_view(['POST'])
def SignInWithICNumber(request):
    ic_number = request.data.get('ic_number')

    if not ic_number:
        return Response({"error": "IC number is required"}, status=400)

    db = firestore.client()
    users_ref = db.collection('Users')
    query = users_ref.where('ICNumber', '==', ic_number).stream()

    email = None
    for doc in query:
        data = doc.to_dict()
        email = data.get('Email')
        break

    if not email:
        return Response({"error": "No user found with this IC number"}, status=404)

    return Response({
        "message": "User found",
        "email": email
    })


@api_view(['POST'])
def SignInWithPhoneNumber(request):
    phone_number = request.data.get('phone_number')

    if not phone_number:
        return Response({"error": "Phone number is required"}, status=400)

    db = firestore.client()
    users_ref = db.collection('Users')
    query = users_ref.where('PhoneNumber', '==', phone_number).stream()

    email = None
    for doc in query:
        data = doc.to_dict()
        email = data.get('Email')
        break

    if not email:
        return Response({"error": "No user found with this phone number"}, status=404)

    return Response({
        "message": "User found",
        "email": email
    })


@api_view(['POST'])
def SignInWithICAndPhoneNumber(request):
    ic_number = request.data.get('ic_number')
    phone_number = request.data.get('phone_number')

    if not ic_number or not phone_number:
        return Response({"error": "IC number and phone number are required"}, status=400)

    db = firestore.client()
    users_ref = db.collection('Users')
    query = users_ref.where('ICNumber', '==', ic_number).where('PhoneNumber', '==', phone_number).stream()

    matched_users = [doc.to_dict() for doc in query]

    if not matched_users:
        return Response({"error": "No user found with this IC number and phone number"}, status=404)

    if len(matched_users) > 1:
        return Response({"error": "Multiple users found. Data inconsistency."}, status=409)

    email = matched_users[0].get('Email')

    return Response({
        "message": "User found",
        "email": email
    })


@api_view(['POST'])
def ForgetPasswordWithICNumber(request):
    ic_number = request.data.get('ic_number')

    if not ic_number:
        return Response({"error": "IC number is required"}, status=400)

    db = firestore.client()
    users_ref = db.collection('Users')
    query = users_ref.where('ICNumber', '==', ic_number).stream()

    email = None
    for doc in query:
        data = doc.to_dict()
        email = data.get('Email')
        break

    if not email:
        return Response({"error": "No user found with this IC number"}, status=404)

    try:
        reset_link = auth.generate_password_reset_link(email)
        return Response({
            "message": "Password reset link generated successfully",
            "email": email,
            "reset_link": reset_link
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    


@api_view(['POST'])
def ForgetPasswordWithEmail(request):
    email = request.data.get('email')
    if not email:
        return Response({"error": "Email is required"}, status=400)
    
    try:
        link = auth.generate_password_reset_link(email)
        # Normally you'd send this link via email using Django's email utils
        return Response({
            "message": "Password reset link generated",
            "reset_link": link
        })
    except Exception as e:
        return Response({"error": str(e)}, status=400)


@api_view(['POST'])
def VerifyTokenPhoneNumberFirebase(request):
    token = request.data.get('idToken')

    try:
        decoded = auth.verify_id_token(token)
        uid = decoded['uid']
        phone = decoded.get('phone_number')

        return Response({
            "message": "Token verified",
            "uid": uid,
            "phone_number": phone
        })
    except Exception as e:
        return Response({"error": str(e)}, status=401)


@api_view(['POST'])
@firebase_auth_required  # Verifies ID token & attaches user info
def SignUp(request):
    user_info = request.user_firebase  # Comes from your middleware
    uid = user_info.get("uid")
    email = user_info.get("email")

    firstName = request.data.get("firstName")
    lastName = request.data.get("lastName")
    phone_number = request.data.get("phoneNumber")
    icPic = request.data.get("icPic")
    profilePic = request.data.get("profilePic")
    profilePicBanner = request.data.get("profilePicBanner")
    totDonatedAmount = request.data.get("totDonatedAmount")
    createdProjectsID = request.data.get("createdProjectsID")
    donatedProjectsID = request.data.get("donatedProjectsID")

    user_doc_ref = db.collection("Users").document(uid)

    # Optional: check if already exists
    if user_doc_ref.get().exists:
        return Response({"message": "User already exists."}, status=400)

    # Create the user doc in Firestore
    user_doc_ref.set({
        "uid": uid,
        "email": email,

        "firstName": firstName,
        "lastName": lastName,
        "phone_number": phone_number,
        "icPic": icPic,
        "profilePic": profilePic,
        "profilePicBanner": profilePicBanner,
        "totDonatedAmount": totDonatedAmount,
        "createdProjectsID": createdProjectsID,
        "donatedProjectsID": donatedProjectsID,
        "timestamp": firestore.SERVER_TIMESTAMP
    })

    return Response({"message": "User profile created successfully!"})

