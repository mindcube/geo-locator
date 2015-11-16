from django.shortcuts import get_object_or_404
from django.shortcuts import render


def index(request):
	"""Stanadard view for homepage of geo-locator"""
	if request.location:
		location = request.location
	else:
		location = None

	return render(request, "homepage.html", {'location': location})
