'use strict';

var logisticsApp = angular.module('logistics', ['ui.router', 'helpers']);

logisticsApp.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('masterdata', {
            url: '/masterdata',
            views: {
                '': { templateUrl: '/template/layout' },
                'main@masterdata': { templateUrl: '/template/masterdata/dashboard' },
                'menu@masterdata': { templateUrl: '/template/masterdata/menu' }
            },
            data: {
                mainContentLabel: 'masterData_dashboard'
            }
        })
        .state('masterdata.product', {
            url: '/product',
            templateUrl: '/template/masterdata/product',
            data: {
                mainContentLabel: 'masterData_products_product'        
            }
        });

}]);