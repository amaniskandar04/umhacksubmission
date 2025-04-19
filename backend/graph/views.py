from django.http import JsonResponse
from backend.firebase import db  # Shared Firebase setup
from rest_framework.decorators import api_view

@api_view(['GET'])
def project_fund_distribution(request):
    try:
        projects_ref = db.collection("Projects").stream()

        distribution = {
            "school": 0,
            "masjid": 0,
            "surau": 0,
            "others": 0
        }

        for project in projects_ref:
            data = project.to_dict()
            project_type = data.get("typeofProject", "others").lower()
            current_amount = float(data.get("CurrentAmount", 0))

            if project_type in distribution:
                distribution[project_type] += current_amount
            else:
                distribution["others"] += current_amount

        return JsonResponse({
            "status": "success",
            "distribution": distribution
        })

    except Exception as e:
        return JsonResponse({
            "status": "error",
            "message": str(e)
        }, status=500)