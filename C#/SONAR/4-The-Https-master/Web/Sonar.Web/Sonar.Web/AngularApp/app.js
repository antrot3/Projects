var sonar = angular.module('sonarApp', ['ngRoute', 'toaster']);

layoutController.$inject = ["$scope", '$http'];
function layoutController($scope, $http) {
    $scope.isLoggedIn = localStorage.getItem('username') != null;

    $scope.logout = function () {
        localStorage.clear();
        $scope.isLoggedIn = false;
    }
}

sonar.controller('layoutController', layoutController);