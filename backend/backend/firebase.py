from django.shortcuts import render
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("backend/umhack2025-50892-firebase-adminsdk-fbsvc-e9d12f56ba.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

