MainController.$inject = ["$rootScope", "$scope", "$http"];
function MainController($rootScope, $scope, $http) {
    getAllEvents();
    $scope.newEvent = {};
    $scope.currentlySelectedLocation = {};
    $scope.currentlySelectedEvent = {}
    $scope.isUpdating = function (setValue) {
        return (setValue == true) ? setValue : false;
    }
    $scope.updateEvent = function () {
        $scope.isUpdating(true);

        $http.post('api/eventsApi/Update/', $scope.currentlySelectedEvent).then(function () {
            $scope.updateProfileMessage = "Successfully event  data...";
            $scope.isUpdating(false);
            $scope.visibilityOptions.isEventDetailsModalVisible = false;
            getAllEvents();
        });
    }

    $scope.isAddNewEventButtonDisabled = function () {
        return !$scope.newEvent.Name || !$scope.newEvent.Description || !$scope.newEvent.EventTypeID;
    };
    
    $scope.visibilityOptions = {
        isEventDetailsModalVisible: false,
        isAddEventModalVisible: false
    };

    $rootScope.$on('eventModalClosed', function () {
        $scope.visibilityOptions.isEventDetailsModalVisible = false;
        $scope.visibilityOptions.isAddEventModalVisible = false;
    });

    $scope.$watch('currentlySelectedLocation', function () {
        if ($scope.currentlySelectedLocation) {
            $scope.newEvent.Latitude = $scope.currentlySelectedLocation.lat;
            $scope.newEvent.Longitude = $scope.currentlySelectedLocation.lng;
        }
    }, true);

    $scope.submitEvent = function () {
        $http.post('api/eventsApi/createEvent', $scope.newEvent).then(function (response) {
            $scope.visibilityOptions.isAddEventModalVisible = false;
            getAllEvents();
        }, function (error) {
            console.log(error);
        });
    };

    function getAllEvents() {
        $http.get('api/eventsApi/GetAllEventsForUser').then(function (response) {
            $scope.events = response.data;
        });

    }
}

sonar.controller('mainController', MainController);