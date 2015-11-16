"""Main view for geo locator application"""
from django.shortcuts import render

def index(request):
    if request.location:
        location = request.location
    else:
        location = None

    return render(request, "homepage.html", {'location': location})
