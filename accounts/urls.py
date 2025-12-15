from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    ProfileView,
    AddCardView,
    ListCardsView,
    DeleteCardView,
    TransactionHistoryView,
    MakePaymentView,

    # ADMIN APIs
    AdminUsersView,
    AdminCardsView,
    AdminTransactionsView,
)

urlpatterns = [
    # ---------- AUTH ----------
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("profile/", ProfileView.as_view()),

    # ---------- JWT ----------
    path("token/refresh/", TokenRefreshView.as_view()),

    # ---------- CARDS ----------
    path("card/add/", AddCardView.as_view()),
    path("card/list/", ListCardsView.as_view()),
    path("card/delete/<int:card_id>/", DeleteCardView.as_view()),

    # ---------- PAYMENTS ----------
    path("pay/", MakePaymentView.as_view()),

    # ---------- USER TRANSACTIONS ----------
    path("transactions/", TransactionHistoryView.as_view()),

    # ---------- ADMIN ----------
    path("admin/users/", AdminUsersView.as_view()),
    path("admin/cards/", AdminCardsView.as_view()),
    path("admin/transactions/", AdminTransactionsView.as_view()),
]
