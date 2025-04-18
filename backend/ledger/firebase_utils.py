import datetime
import pytz
import hashlib
from backend.firebase import db
from firebase_admin import firestore

def hash_transaction_data(data: dict) -> str:
    # Convert dict to string and hash it
    data_string = f"{data['user_id']}{data['type']}{data['amount']}{data['timestamp']}{data.get('prev_hash', '')}"
    return hashlib.sha256(data_string.encode()).hexdigest()

def log_transaction(user_id, transaction_type, amount):
    # Define Malaysia timezone
    malaysia_tz = pytz.timezone('Asia/Kuala_Lumpur')

    # Get current time in Malaysia time
    timestamp_dt = datetime.datetime.now(malaysia_tz)
    timestamp_unix = int(timestamp_dt.timestamp())

    user_txn_ref = db.collection('transactions').document(user_id).collection('transaction_log')

    # Get the last transaction (sorted by timestamp descending)
    last_txns = user_txn_ref.order_by("timestamp", direction=firestore.Query.DESCENDING).limit(1).stream()
    prev_hash = None
    for txn in last_txns:
        prev_hash = txn.to_dict().get("hash")
        break

    transaction_data = {
        'user_id': user_id,
        'type': transaction_type,
        'amount': amount,
        'timestamp': timestamp_dt,
        'prev_hash': prev_hash or '',
    }

    # Generate current hash
    transaction_data['hash'] = hash_transaction_data({
        'user_id': user_id,
        'type': transaction_type,
        'amount': amount,
        'timestamp': timestamp_unix,
        'prev_hash': prev_hash or '',
    })

    # Save it
    txn_ref = user_txn_ref.document(str(timestamp_unix))
    txn_ref.set(transaction_data)

    return timestamp_dt

def verify_transaction_chain(user_id):
    txn_ref = db.collection('transactions').document(user_id).collection('transaction_log')
    txns = list(txn_ref.order_by("timestamp").stream())

    prev_hash = ''
    for txn in txns:
        data = txn.to_dict()

        # Save the current hash and remove it temporarily to re-hash
        stored_hash = data['hash']
        data_copy = data.copy()
        del data_copy['hash']

        # Convert Firestore timestamp to Unix timestamp (int) if it's a datetime object
        ts = data_copy['timestamp']
        if isinstance(ts, datetime.datetime):  # Use datetime.datetime explicitly
            data_copy['timestamp'] = int(ts.timestamp())
        else:
            data_copy['timestamp'] = int(ts)  # fallback if already int/str

        # Add expected prev_hash before rehashing
        data_copy['prev_hash'] = prev_hash

        # Recalculate hash
        recalculated_hash = hash_transaction_data(data_copy)

        if stored_hash != recalculated_hash:
            return {"valid": False, "message": f"Hash mismatch at timestamp {data['timestamp']}"}

        prev_hash = stored_hash

    return {"valid": True, "message": "All transactions valid"}