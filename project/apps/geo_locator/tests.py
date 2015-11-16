from django.test import TestCase
from django.test import Client


class SimpleTest(TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        response = self.client.get('/')

        self.assertEqual(response.status_code, 200)

    def test_geolocation_real_ip(self):
        # test with a known ip address
        response = self.client.get('/', REMOTE_ADDR='172.249.173.233')

        self.assertEqual(response.context['location']['latitude'], 34.1125)
        self.assertEqual(response.context['location']['longitude'], -118.1908)

    def test_geolocation_local_ip(self):
        # test with local IP
        response = self.client.get('/', REMOTE_ADDR='127.0.0.1')

        self.assertIsNone(response.context['location'])
