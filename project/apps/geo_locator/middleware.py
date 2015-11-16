"""Middleware that detects users IP address and queries the maxmind database"""
from django.http import HttpResponse
from django.conf import settings

from geoip2 import database

from ipware.ip import get_ip
from ipware.ip import get_real_ip


class GeoIpMiddleware(object):

    def process_request(self, request):
        request.location = {}

        if not settings.DEBUG:
            ip_address = get_real_ip(request)
        else:
            # We'll set it to an LA based IP address if in debug mode
            ip_address = get_ip(request)

        if not ip_address:
            return None

        try:
            geodb_client = database.Reader(
                settings.GEOIP_PATH + '/GeoLite2-City.mmdb')
        except:
            return None

        try:
            response = geodb_client.city(ip_address)
        except:
            return None

        request.location = {
            'latitude': response.location.latitude,
            'longitude': response.location.longitude
        }
