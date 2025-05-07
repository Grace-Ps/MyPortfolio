import cv2
import numpy as np
from django.http import JsonResponse
from django.shortcuts import render

def qr_code_scanner(request):
    if request.method == 'POST' and request.FILES.get('qr_code'):
        qr_file = request.FILES['qr_code']
        qr_image = np.frombuffer(qr_file.read(), np.uint8)
        qr_image = cv2.imdecode(qr_image, cv2.IMREAD_COLOR)

        # Initialize QR Code detector
        qr_detector = cv2.QRCodeDetector()
        data, bbox, _ = qr_detector.detectAndDecode(qr_image)

        # Return the decoded data or an error message
        return JsonResponse({'result': data if data else 'No QR code detected.'})
    return render(request, 'qr_code_scanner.html')