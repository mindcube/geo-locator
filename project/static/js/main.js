var APP = APP || {};

APP = {
    init: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                APP.drawMap(position.coords.latitude, position.coords.longitude);
            }, function() {
                if (APP.serverCoords()) {
                    APP.drawMap(Number(window.latitude), Number(window.longitude))
                }
            });
        } else if (APP.serverCoords()) {
            // no browser support for geolocation api
            APP.drawMap(Number(window.latitude), Number(window.longitude))
        } else {
            error('No GEO data available.')
        }

        APP.initPlaces();
        APP.bindLookupForm();
    },

    bindLookupForm: function() {
        $('.address-form').submit(function(e) {
            e.preventDefault();
            console.log('yo');
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
        if (typeof(window.latitude == "string")) {
            return true;
        }
        return false;
    },

    drawMap: function(latitude, longitude) {
        var coords = new google.maps.LatLng(latitude, longitude);

        var options = {
            zoom: 15,
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
