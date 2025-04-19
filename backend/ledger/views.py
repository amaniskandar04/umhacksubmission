from django.shortcuts import render
from django.http import JsonResponse
from .firebase_utils import log_transaction, verify_transaction_chain, send_tamper_alert_email
from backend.firebase import db
from firebase_admin import firestore
from rest_framework.decorators import api_view
from rest_framework.response import Response

def log_transaction_view(request):
    if request.method == 'POST':
        user_id = request.POST.get('user_id')
        txn_type = request.POST.get('type')  # 'debit' or 'credit'
        amount = float(request.POST.get('amount', 0))

        if not all([user_id, txn_type, amount]):
            return JsonResponse({'error': 'Missing parameters'}, status=400)

        timestamp = log_transaction(user_id, txn_type, amount)
        return JsonResponse({'message': 'Transaction logged', 'timestamp': timestamp})

    return JsonResponse({'error': 'Invalid request method'}, status=405)

def verify_chain_view(request):
    user_id = request.GET.get('user_id')
    if not user_id:
        return JsonResponse({'error': 'Missing user_id'}, status=400)

    is_valid = verify_transaction_chain(user_id)
    return JsonResponse({'valid': is_valid})

def test_blockchain_transaction(request):
    try:
        # Prepare the transaction data with all required fields
        user_id = "user_123"  # For testing purposes, you can hardcode or get this from user session
        transaction_type = "credit"  # Example of transaction type
        amount = 1000  # Example of amount

        # Log the transaction in Firestore first
        txn_timestamp = log_transaction(user_id, transaction_type, amount)

        return JsonResponse({
            "status": "success",
            "transaction_id": txn_timestamp,  # Using timestamp from log_transaction as the unique ID
        })
    
    except Exception as e:
        return JsonResponse({
            "status": "failure",
            "error": str(e)
        })
        
def test_tamper_email(request):
    # Simulated values for the alert
    user_id = 'testuser123'
    timestamp = '2025-04-18T14:00:00+08:00'
    differences = {
        "amount": {
            "expected": 100,
            "actual": 1000000
        },
        "type": {
            "expected": "credit",
            "actual": "debit"
        }
    }

    try:
        send_tamper_alert_email(user_id, timestamp, differences)
        return JsonResponse({"status": "success", "message": "Email sent!"})
    except Exception as e:
        return JsonResponse({"status": "failure", "error": str(e)})
        
@api_view(['GET'])
def test_blockchain_validation(request):
    user_id = request.GET.get('user_id')
    if not user_id:
        return Response({"status": "failure", "message": "user_id not provided"}, status=400)

    result = verify_transaction_chain(user_id)
    return Response(result)