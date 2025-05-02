from django.urls import path
from . import views

urlpatterns = [
    path('qr-code-scanner/', views.qr_code_scanner, name='qr_code_scanner'),
]