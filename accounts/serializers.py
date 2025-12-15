from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Card, Transaction


# =========================
# REGISTER SERIALIZER
# =========================
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password")

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"],
        )


# =========================
# LOGIN SERIALIZER ✅
# =========================
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(
            username=attrs["username"],
            password=attrs["password"]
        )

        if not user:
            raise serializers.ValidationError("Invalid username or password")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled")

        refresh = RefreshToken.for_user(user)

        return {
            "user_id": user.id,
            "username": user.username,
            "is_superuser": user.is_superuser,
            "is_staff": user.is_staff,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }


# =========================
# PROFILE SERIALIZER ✅ FIXED
# =========================
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "is_superuser",
            "is_staff",
        )


# =========================
# CARD SERIALIZERS
# =========================
class CardSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Card
        fields = "__all__"
        read_only_fields = ("user", "masked_card", "last4")


class AddCardSerializer(serializers.Serializer):
    card_number = serializers.CharField(min_length=12, max_length=19)
    card_holder = serializers.CharField()
    card_type = serializers.CharField()
    expiry_date = serializers.CharField()

    def validate_card_number(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Card number must contain digits only")
        return value

    def create(self, validated_data):
        number = validated_data["card_number"]
        masked = "XXXX XXXX XXXX " + number[-4:]

        return Card.objects.create(
            user=self.context["request"].user,
            card_holder=validated_data["card_holder"],
            card_type=validated_data["card_type"],
            masked_card=masked,
            last4=number[-4:],
            expiry_date=validated_data["expiry_date"],
        )


# =========================
# TRANSACTION SERIALIZER
# =========================
class TransactionSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Transaction
        fields = "__all__"
