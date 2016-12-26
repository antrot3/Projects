var app = angular.module("crudModule", ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/index', {
            templateUrl: 'Muzika/Index',
            controller: 'crudController'
        })
        .when('/playlist', {
            templateUrl: 'Muzika/Playlist',
            controller: 'crudController'
        })
        .when('/', {
            templateUrl: 'Muzika/Playlist',
            controller: 'crudController'
        })
        .otherwise({ redirectTo: '/index' });
}]);