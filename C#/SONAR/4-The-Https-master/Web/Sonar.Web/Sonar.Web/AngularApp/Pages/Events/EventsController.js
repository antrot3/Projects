EventsController.$inject = ["$rootScope","$scope", "$http"];
function EventsController($rootScope, $scope, $http) {
    $scope.eventsDisplayedOnMap = [];
    $scope.showOnMap = function(event) {
        $scope.eventsDisplayedOnMap = [event];
    };

    $http.get('api/eventsApi/GetAllEventsForUser').then(function (response) {
        $scope.events = response.data;
    });
}

sonar.controller('eventsController', EventsController);