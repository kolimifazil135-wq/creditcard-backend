from django.db import models
from django.contrib.auth.models import User
import uuid


# ---------------- CARD MODEL ---------------- #

class Card(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cards")
    card_holder = models.CharField(max_length=100)

    CARD_TYPES = [
        ("VISA", "VISA"),
        ("MASTERCARD", "Mastercard"),
        ("RUPAY", "RuPay"),
        ("AMEX", "American Express"),
        ("DEBIT", "Debit Card"),
        ("CREDIT", "Credit Card"),
    ]

    card_type = models.CharField(max_length=20, choices=CARD_TYPES)

    # SECURE STORAGE
    masked_card = models.CharField(max_length=19)      # XXXX XXXX XXXX 1234
    last4 = models.CharField(max_length=4)             # Only last 4 stored
    expiry_date = models.CharField(max_length=7)       # MM/YYYY

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.card_type} - **** {self.last4}"


# ---------------- TRANSACTION MODEL ---------------- #

class Transaction(models.Model):

    STATUS = [
        ("PENDING", "Pending"),
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="transactions")

    # Use UUID for security
    payment_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    amount = models.FloatField()
    status = models.CharField(max_length=20, choices=STATUS)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Txn {self.id} - {self.status}"
