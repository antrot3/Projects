var app = angular.module("crudModule", ['ngRoute', 'ui.bootstrap', 'ngMessages']);
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
    $routeProvider.when('/Index/Edit/:id',
       {
           templateUrl: 'Template/Edit.html',
           controller: 'crudController'
       })
    $routeProvider.when('/Index/Delete/:id',
      {
          templateUrl: 'Template/Delete.html',
          controller: 'crudController'
      })
    $routeProvider.when('/Index/Delete/Broj/:id',
      {
          templateUrl: 'Template/DeleteBroj.html',
          controller: 'crudControllerGlavna'
         
      })
    $routeProvider.when('/Kreiraj/New/',
       {
           templateUrl: 'Template/New.html',
           controller: 'crudController'
          
       })
    $locationProvider.html5Mode(false).hashPrefix('!');
});
app.filter('StartFrom', function () {
    return function (data, start) {
        return data.slice(start);
    }
});
