import csv
from django.http import HttpResponse
from .models import Transaction

def export_transactions_csv(request):
    if not request.user.is_staff:
        return HttpResponse("Unauthorized", status=401)

    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="transactions.csv"'

    writer = csv.writer(response)
    writer.writerow(["ID", "User", "Amount", "Status", "Date"])

    for t in Transaction.objects.all():
        writer.writerow([t.id, t.user.username, t.amount, t.status, t.created_at])

    return response
