from django.urls import path
from . import views

urlpatterns = [
    #Return project docs
    path('RetrievedOngoingProject/', views.RetrievedOngoingProject, name='RetrievedOngoingProject'),
    #Return project docs 
    path('RetrievedCompletedProject/', views.RetrievedCompletedProject, name='RetrievedCompletedProject'),
    #Return project docs 
    path('RetrievedProjectsByType/', views.RetrievedProjectsByType, name='RetrievedProjectsByType'),
    #Return project docs 
    path('RetrievedFullProjectDetails/', views.RetrievedFullProjectDetails, name='RetrievedFullProjectDetails'),


    #Return user doc
    path('RetrievedUserProfile/', views.RetrievedUserProfile, name='RetrievedUserProfile'),
    #Return project docs 
    path('RetrievedRecentlyDonated/', views.RetrievedRecentlyDonated, name='RetrievedRecentlyDonated'),
    #Return project docs 
    path('RetrievedPrevDonation/', views.RetrievedPrevDonation, name='RetrievedPrevDonation'),
    #Return project docs 
    path('RetrievedRecentlyCreatedProject/', views.RetrievedRecentlyCreatedProject, name='RetrievedRecentlyCreatedProject'),
    #Return project docs 
    path('RetrievedPreviousProject/', views.RetrievedPreviousProject, name='RetrievedPreviousProject'),
    #Return confirmation message
    path('UploadProject/', views.UploadProject, name='UploadProject'),
    
     #Return payment message
    path('create_checkout_session/', views.create_checkout_session, name='create_checkout_session'),
]
