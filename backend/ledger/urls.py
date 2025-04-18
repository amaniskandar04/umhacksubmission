from django.urls import path
from . import views

urlpatterns = [
    path('log/', views.log_transaction_view, name='log_transaction'),
    path('verify/', views.verify_chain_view, name='verify_chain'),
    path('test-blockchain-transaction/', views.test_blockchain_transaction, name='test_blockchain_transaction'),
    path('test-chain/', views.test_blockchain_validation, name='test_blockchain_validation'),
]