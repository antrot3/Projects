'use strict';

bridgeWebApp.controller('signOutController', ['$state', 'authService', function ($state, authService) {

    authService.signOut();
    $state.go('signin');

}]);