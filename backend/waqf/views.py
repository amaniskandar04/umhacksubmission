from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from backend.firebase import db
from firebase_admin import auth, firestore
from . import firebaseauth # This ensures Firebase is initialized
from .firebaseauth import firebase_auth_required
from datetime import datetime
import stripe
from django.conf import settings

stripe.api_key = "sk_test_51RFXeAPBTMj6yaMdhT6VrQUCbGKkIx7QoxPTYXxXbStQWwgWcg4qVSY26rVsu9jh43Y02n2ltxpfa9eZqUeSK9TK00fEocjhZ0"  # replace with your actual secret key

#PublicDataRetrieved 
@api_view(['POST'])
def RetrievedOngoingProject(request):
    projects_ref = db.collection('Projects')
    
    # Query projects where ProjectTimelineState != "completed"
    query = projects_ref.where('ProjectTimelineState', '!=', 'completed').stream()

    ongoing_projects = []
    for doc in query:
        data = doc.to_dict()
        data['id'] = doc.id  # Optionally include document ID
        ongoing_projects.append(data)

    return Response({
        "message": "Retrieved Ongoing Projects",
        "projects": ongoing_projects
    })

@api_view(['POST'])
def RetrievedCompletedProject(request):
    projects_ref = db.collection('Projects')
    
    # Query only completed projects
    query = projects_ref.where('ProjectTimelineState', '==', 'completed').stream()

    completed_projects = []
    for doc in query:
        data = doc.to_dict()
        data['id'] = doc.id  # Optionally include the document ID
        completed_projects.append(data)

    return Response({
        "message": "Retrieved Completed Projects",
        "projects": completed_projects
    })

@api_view(['POST'])
def RetrievedProjectsByType(request):
    project_type = request.data.get('typeofProject')

    if not project_type:
        return Response({"error": "typeofProject is required"}, status=400)

    projects_ref = db.collection('Projects')
    query = projects_ref.where('typeofProject', '==', project_type).stream()

    filtered_projects = []
    for doc in query:
        data = doc.to_dict()
        data['id'] = doc.id
        filtered_projects.append(data)

    return Response({
        "message": f"Projects filtered by type: {project_type}",
        "projects": filtered_projects
    })

@api_view(['POST'])
def RetrievedFullProjectDetails(request):
    # Get the project ID from the request
    project_id = request.data.get('project_id')

    if not project_id:
        return Response({"error": "Project ID is required"}, status=400)

    # Retrieve the project document from Firestore using the project ID
    project_doc = db.collection("Projects").document(project_id).get()

    if not project_doc.exists:
        return Response({"error": "Project not found"}, status=404)

    # Get the project data
    project_data = project_doc.to_dict()

    return Response({
        "message": "Project details retrieved successfully",
        "project": project_data
    })
    
    

#PrivateDataRetrieved
@api_view(['POST'])
def RetrievedUserProfile(request):
    uid = request.data.get('uid')

    if not uid:
        return Response({"error": "UID is required"}, status=400)

    user_doc = db.collection("Users").document(uid).get()

    if not user_doc.exists:
        return Response({"error": "User not found"}, status=404)

    user_data = user_doc.to_dict()
    user_data['uid'] = uid  # Include UID in the response for reference

    return Response({
        "message": "User profile retrieved successfully",
        "user": user_data
    })

@api_view(['POST'])
def RetrievedRecentlyDonated(request):
    return Response({
        "message": "Recently donated projects retrieved successfully"
    })

@api_view(['POST'])
def RetrievedPrevDonation(request):
    # Get the UID from the request
    uid = request.data.get('uid')

    if not uid:
        return Response({"error": "UID is required"}, status=400)

    # Retrieve the user document from Firestore
    user_doc = db.collection("Users").document(uid).get()

    if not user_doc.exists:
        return Response({"error": "User not found"}, status=404)

    # Get the DonatedProjectID array
    donated_project_ids = user_doc.to_dict().get('donatedProjectsID', [])

    if not donated_project_ids:
        return Response({"message": "No donated projects found"}, status=404)

    # Retrieve projects that match the donated project IDs
    projects_ref = db.collection("Projects")
    projects = []

    for project_id in donated_project_ids:
        project_doc = projects_ref.document(project_id).get()

        if project_doc.exists:
            project_data = project_doc.to_dict()
            projects.append(project_data)

    # If no projects were found
    if not projects:
        return Response({"message": "No matching projects found"}, status=404)

    return Response({
        "message": "Recently donated projects retrieved successfully",
        "projects": projects
    })

@api_view(['POST'])
def RetrievedRecentlyCreatedProject(request):
    return Response({"message": "RetrievedRecentlyCreatedProject"})
    
@api_view(['POST'])
def RetrievedPreviousProject(request):
    # Get the UID from the request
    uid = request.data.get('uid')

    if not uid:
        return Response({"error": "UID is required"}, status=400)

    # Retrieve the user document from Firestore
    user_doc = db.collection("Users").document(uid).get()

    if not user_doc.exists:
        return Response({"error": "User not found"}, status=404)

    # Get the createdProjectsID array
    created_project_ids = user_doc.to_dict().get('createdProjectsID', [])

    if not created_project_ids:
        return Response({"message": "No created projects found"}, status=404)

    # Retrieve projects that match the created project IDs
    projects_ref = db.collection("Projects")
    projects = []

    for project_id in created_project_ids:
        project_doc = projects_ref.document(project_id).get()

        if project_doc.exists:
            project_data = project_doc.to_dict()
            projects.append(project_data)

    # If no projects were found
    if not projects:
        return Response({"message": "No matching projects found"}, status=404)

    return Response({
        "message": "Previously created projects retrieved successfully",
        "projects": projects
    })

@api_view(['POST'])
def UploadProject(request):
    data = request.data

    # Required fields
    title = data.get("title")
    description = data.get("description")
    location = data.get("location")
    needed_amount = data.get("neededAmount")
    project_duration = data.get("projectDuration")
    typeof_project = data.get("typeofProject")
    project_pic_banner = data.get("projectPicBanner")
    project_pic_details = data.get("projectPicDetails")
    project_files = data.get("projectFiles")
    letter_of_approval = data.get("letterOfApproval")
    created_by_uid = data.get("createdByUid")

    # Validate required fields
    required_fields = [title, description, location, needed_amount, project_duration,
                       typeof_project, project_pic_banner, project_pic_details,
                       project_files, letter_of_approval, created_by_uid]

    if not all(required_fields):
        return Response({"error": "All fields are required."}, status=400)

    # Optional: calculate start/end or receive from frontend
    now = datetime.utcnow()
    project_data = {
        "Title": title,
        "Description": description,
        "Location": location,
        "NeededAmount": needed_amount,
        "CurrentAmount": "0",  # default
        "ProjectDuration": project_duration,
        "typeofProject": typeof_project,
        "ProjectTimelineState": "Ongoing",  # default state
        "ProjectPicBanner": project_pic_banner,
        "ProjectPicDetails": project_pic_details,
        "ProjectFiles": project_files,
        "LetterofApproval": letter_of_approval,
        "ProjectStart": now,
        "ProjectEnd": None,  # Can be set later
        "timestamp": now,
        "CreatedByUid": created_by_uid
    }

    # Add to Firestore
    new_project_ref = db.collection("Projects").document()
    new_project_ref.set(project_data)

    return Response({
        "message": "Project uploaded successfully!",
        "projectId": new_project_ref.id
    })


@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def create_checkout_session(request):
    try:
        data = request.data
        amount = int(float(data.get("amount", 0)) * 100)  # convert to cents
        title = data.get("title", "Waqf Project")
        project_id = data.get("projectId", "unknown")
        user_id = data.get("user_id", "uid")

        if amount < 100:
            return JsonResponse({"error": "Minimum donation is $1"}, status=400)

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "myr",
                        "product_data": {
                            "name": title,
                        },
                        "unit_amount": amount,
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            success_url=f"http://localhost:3000/donation-success?amount={amount}&user_id={user_id}",
            cancel_url="http://localhost:3000/",
            metadata={
                "project_id": project_id
            }
        )

        return JsonResponse({"id": session.id})
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)