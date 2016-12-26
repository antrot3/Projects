var apiKey = "AIzaSyDFN-6n_8rTK7x2sgRmONkTd7STu3yJpew";
var googleMap = null;
var currentMarkers = [];
var currentCircles = [];
var DEFAULT_ZOOM = 13;

mapDirective.$inject = [];
function mapDirective() {

	return {
		scope: {
		    events: "=",
		    visibilityOptions: "=",
		    location: "=",
		    currentlySelectedEvent: "=",
            isEventsPage: "="
		},
		templateUrl: 'AngularApp/Components/GoogleMap/googleMap.html',
		controller: mapController,
		link: mapLink
	};
}

mapController.$inject = ['$scope'];
function mapController($scope) {
    $scope.$watch('events', function (val) {
        currentMarkers = [];
        _(currentCircles).each(function(circle) { circle.setMap(null) });

        _($scope.events).each(function(event) {
            var marker = addMarkerToMap(event);

            marker.addListener('click', function () {
                $scope.currentlySelectedEvent = event; 
                $scope.visibilityOptions.isEventDetailsModalVisible = true;
                $scope.$apply();
            });
        });

        if ($scope.events && $scope.events.length && $scope.isEventsPage) {
            var firstEvent = $scope.events[0];
            var position = new google.maps.LatLng(firstEvent.Latitude, firstEvent.Longitude);
            googleMap.setCenter(position);
            googleMap.setZoom(DEFAULT_ZOOM);
        }
    });
}

function addMarkerToMap(marker) {
    var position = new google.maps.LatLng(marker.Latitude, marker.Longitude);
    var newMarker = new google.maps.Marker({
        position: position,
        map: googleMap,
        title: marker.Name
    });

    var radiusCircle = new google.maps.Circle({
        center: position,
        radius: marker.Radius,
        map: googleMap,
        fillOpacity: 0.2,
        strokeColor: '#FF0000',
        strokeOpacity:0.2,
        fillColor: 'red'
    });

    newMarker.description = marker.Description;
    newMarker.personName = marker.Person;

    currentCircles.push(radiusCircle);
    currentMarkers.push(newMarker);
    return newMarker;
}

function mapLink(scope, _el, _attrs) {
    var element = document.getElementById('googleMap');

	googleMap = new google.maps.Map(element, {
		zoom: DEFAULT_ZOOM
	});

	getCurrentLocationAndCenter();

	googleMap.addListener("click", function (event) {
	    scope.location = {
	        lat: event.latLng.lat(),
            lng: event.latLng.lng()
	    };
	    scope.visibilityOptions.isAddEventModalVisible = true;
	    scope.$apply();
	});
}

function getCurrentLocationAndCenter() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var image = {
            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            size: new google.maps.Size(20, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        };
        googleMap.setCenter(pos);
        new google.maps.Marker({ position: pos, map: googleMap, animation: google.maps.Animation.DROP,icon:museum });
        googleMap.setZoom(DEFAULT_ZOOM);
    }, function () {
        alert('geolocation disabled');
    });
}

sonar.directive('googleMap', mapDirective);