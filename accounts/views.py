from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserSerializer,
    AddCardSerializer,
    CardSerializer,
    TransactionSerializer,
)

from .models import Card, Transaction


# =========================
# REGISTER
# =========================
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# LOGIN
# =========================
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# LOGOUT
# =========================
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh = RefreshToken(request.data.get("refresh"))
            refresh.blacklist()
            return Response(
                {"message": "Logged out successfully"},
                status=status.HTTP_205_RESET_CONTENT,
            )
        except Exception:
            return Response(
                {"error": "Invalid refresh token"},
                status=status.HTTP_400_BAD_REQUEST,
            )


# =========================
# PROFILE
# =========================
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            UserSerializer(request.user).data,
            status=status.HTTP_200_OK,
        )


# =========================
# ADD CARD
# =========================
class AddCardView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AddCardSerializer(
            data=request.data,
            context={"request": request},
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Card saved successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# LIST USER CARDS
# =========================
class ListCardsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cards = Card.objects.filter(user=request.user)
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# =========================
# DELETE CARD
# =========================
class DeleteCardView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, card_id):
        try:
            card = Card.objects.get(id=card_id, user=request.user)
            card.delete()
            return Response(
                {"message": "Card deleted"},
                status=status.HTTP_200_OK,
            )
        except Card.DoesNotExist:
            return Response(
                {"error": "Card not found"},
                status=status.HTTP_404_NOT_FOUND,
            )


# =========================
# MAKE PAYMENT
# =========================
class MakePaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amount = request.data.get("amount")
        card_id = request.data.get("card_id")

        if not amount or not card_id:
            return Response(
                {"error": "Amount and card_id are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            amount = float(amount)
            if amount <= 0:
                raise ValueError
        except ValueError:
            return Response(
                {"error": "Invalid amount"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            Card.objects.get(id=card_id, user=request.user)
        except Card.DoesNotExist:
            return Response(
                {"error": "Invalid card"},
                status=status.HTTP_404_NOT_FOUND,
            )

        transaction = Transaction.objects.create(
            user=request.user,
            amount=amount,
            status="SUCCESS",
        )

        return Response(
            {
                "message": "Payment successful",
                "transaction_id": transaction.id,
                "payment_id": str(transaction.payment_id),
                "amount": transaction.amount,
                "status": transaction.status,
            },
            status=status.HTTP_201_CREATED,
        )


# =========================
# USER TRANSACTION HISTORY
# =========================
class TransactionHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        transactions = Transaction.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# ======================================================
# ===================== ADMIN APIs =====================
# ======================================================

class AdminUsersView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AdminCardsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        cards = Card.objects.select_related("user").all()
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AdminTransactionsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        transactions = Transaction.objects.select_related(
            "user"
        ).order_by("-created_at")
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
