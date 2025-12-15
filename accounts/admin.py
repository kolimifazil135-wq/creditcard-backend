# accounts/admin.py

from django.contrib import admin
from django.contrib.auth.models import User, Group
from django.db.models import Sum
from django.http import HttpResponse
from datetime import date
from django.urls import path
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from .models import Card, Transaction


# ---------------- CARD ADMIN ---------------- #

class CardAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "card_holder", "card_type", "masked_card", "expiry_date")
    search_fields = ("user__username", "card_holder", "card_type")
    list_filter = ("card_type",)


# ---------------- TRANSACTION ADMIN ---------------- #

class TransactionAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "payment_id", "amount", "status", "created_at")
    search_fields = ("user__username", "payment_id")
    list_filter = ("status", "created_at")
    date_hierarchy = "created_at"


# ---------------- DAILY SUMMARY REPORT ---------------- #

def daily_summary_report(request):
    today = date.today()
    qs = Transaction.objects.filter(created_at__date=today)

    total_txn = qs.count()
    success = qs.filter(status="SUCCESS").count()
    failed = qs.filter(status="FAILED").count()
    amount = qs.filter(status="SUCCESS").aggregate(Sum("amount"))["amount__sum"] or 0

    report = f"""
DAILY PAYMENT SUMMARY - {today}

Total Transactions: {total_txn}
Successful Payments: {success}
Failed Payments: {failed}
Total Amount Collected: ₹{amount}
"""

    return HttpResponse(report, content_type="text/plain")


# ---------------- CUSTOM ADMIN SITE ---------------- #

class CustomAdminSite(admin.AdminSite):
    site_header = "Credit Card Payment Admin Portal"

    def get_urls(self):
        urls = super().get_urls()
        custom = [
            path("daily-summary/", self.admin_view(daily_summary_report), name="daily-summary"),
        ]
        return custom + urls


custom_admin_site = CustomAdminSite(name="custom_admin")

# Register Django built-in models
custom_admin_site.register(User)
custom_admin_site.register(Group)

# Register JWT blacklist models
custom_admin_site.register(BlacklistedToken)
custom_admin_site.register(OutstandingToken)

# Register our models
custom_admin_site.register(Card, CardAdmin)
custom_admin_site.register(Transaction, TransactionAdmin)
