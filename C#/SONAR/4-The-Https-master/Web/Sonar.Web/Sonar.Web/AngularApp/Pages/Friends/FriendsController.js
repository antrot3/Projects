FriendsController.$inject = ["$scope", "$http"];
function FriendsController($scope, $http) {
    $http.get('api/friendsapi/GetAllPeople').then(function (response) {
        $scope.people = response.data;
    });

    $http.get('api/friendsapi/GetAllFriendsForUser', localStorage.getItem('username')).then(function (response) {
        $scope.friends = response.data;
    });
}

sonar.controller('friendsController', FriendsController);