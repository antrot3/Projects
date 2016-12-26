var app = angular.module("crudModule", ['ngRoute']);
app.factory("ShareData", function () {
    return { value: 0 }
});
app.config(function($routeProvider,$locationProvider){
    //Path - it should be same as href link



    $locationProvider.html5Mode(true);
    $routeProvider.when('/Playlista',
        { templateUrl: 'Template/Playlist.html' })
    $routeProvider.when('/GlavnaPlay/:id',
       {
           templateUrl: 'Template/GlavnaPlay.html',
           controller: 'crudControllerGlavna'
       })
    $routeProvider.when('/Index', { templateUrl: 'Template/Index.html' })
    $routeProvider.when('/Index/:id',
       {
           templateUrl: 'Template/Description.html',
           controller: 'crudControllerDetalji'
       })
    $locationProvider.html5Mode(false).hashPrefix('!');
});
