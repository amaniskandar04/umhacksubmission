from django.urls import path
from .views import project_fund_distribution

urlpatterns = [
    path('fund-distribution/', project_fund_distribution, name='project_fund_distribution'),
]