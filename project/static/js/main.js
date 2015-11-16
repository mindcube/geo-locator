var APP = APP || {};

APP = {
    init: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                APP.drawMap(position.coords.latitude, position.coords.longitude);
            }, function() {
                if (APP.serverCoords()) {
                    APP.drawMap(Number(window.server_latitude), Number(window.server_longitude))
                } else {
                    console.log('No server coords.  Using default of LA as placeholder')
                    APP.drawMap(34.044955, -118.24518)
                }
            });
        } else if (APP.serverCoords()) {
            // no browser support for geolocation api
            APP.drawMap(Number(window.server_latitude), Number(window.server_longitude))
        } else {
            console.log('No GEO data available.')
            APP.drawMap(34.044955, -118.24518)
        }

        APP.initPlaces();
        APP.bindLookupForm();
    },

    bindLookupForm: function() {
        $('.address-form').submit(function(e) {
            e.preventDefault();
        });
    },

    initPlaces: function() {
        var options = {};

        var address_input = document.getElementById('address');
        var autocomplete = new google.maps.places.Autocomplete(address_input,options);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            APP.drawMap(place.geometry.location.lat(), place.geometry.location.lng());
        });
    },

    serverCoords: function() {
        if (window.server_latitude > 0) {
            console.log('test', window.server_latitude);
            return true;
        }
        return false;
    },

    drawMap: function(latitude, longitude) {
        var coords = new google.maps.LatLng(latitude, longitude);

        var options = {
            zoom: 14,
            center: coords,
            mapTypeControl: false,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), options);

        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: "You are here!"
        });
    }
}
