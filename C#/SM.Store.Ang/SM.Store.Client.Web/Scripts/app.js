'use strict'

//Declare app level module which depends on filters, and services
angular.module('smApp', ['ngRoute', 'smApp.controllers', 'smApp.AppServices', 'smApp.directives',
                'ui.bootstrap', 'trNgGrid', 'ngTable', 'ajaxLoader', function () {
}])
//Configure the routes
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/list', {
        templateUrl: '/Pages/productList.html',
        controller: 'productListController'
    })
    .when('/list_nt', {
        templateUrl: '/Pages/productList_nt.html',
        controller: 'productListController_nt'
    })
    .when('/about', {
        templateUrl: '/Pages/about.html',
        controller: 'aboutController'
    })
    .when('/list/:id', {
        templateUrl: '/Pages/_product.html',
        controller: 'productController'
    })
    ;

    $routeProvider.otherwise({ redirectTo: '/list' });
}])
;

