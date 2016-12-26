'use strict';

bridgeWebApp.controller('signInController', ['$scope', '$state', '$timeout', 'authService', function ($scope, $state, $timeout, authService) {

    $scope.failedSignIn = false;

    $scope.signIn = function() {

        $scope.failedSignIn = false;

        authService.signIn($scope.credentials).then(function() {

            $state.go('dashboard');

        }, function() {

            $scope.credentials.username = '';
            $scope.credentials.password = '';

            $scope.failedSignIn = true;
            $timeout(function () { $scope.failedSignIn = false; }, 4000);

        });
    };

}]);