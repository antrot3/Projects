'use strict';

var businessInteligenceApp = angular.module('businessInteligence', ['ui.router', 'helpers', 'logistics']);

businessInteligenceApp.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('businessinteligence', {
          url: '/businessinteligence',
          views: {
            '': { templateUrl: '/template/layout' },
            'main@businessinteligence': { templateUrl: '/template/businessinteligence/dashboard' },
            'menu@businessinteligence': { templateUrl: '/template/businessinteligence/menu' }
          },
          data: {
              mainContentLabel: 'businessInteligence_dashboard'
          }
      })
      .state('businessinteligence.cumulativesalesbyproducts', {
          url: '/cumulativesalesbyproducts',
          templateUrl: '/template/businessinteligence/cumulativesalesbyproducts',
          data: {
              mainContentLabel: 'businessInteligence_cumulativeSalesByProducts'
          }
      })
      .state('businessinteligence.cumulativesalesbyplants', {
          url: '/cumulativesalesbyplants',
          templateUrl: '/template/businessinteligence/cumulativesalesbyplants',
          data: {
              mainContentLabel: 'businessInteligence_cumulativeSalesByPlants'
          }
      })
      .state('businessinteligence.cumulativesalesbymonths', {
          url: '/cumulativesalesbymonths',
          templateUrl: '/template/businessinteligence/cumulativesalesbymonths',
          data: {
              mainContentLabel: 'businessInteligence_cumulativeSalesByMonths'
          }
      })
      .state('businessinteligence.cumulativesalesbybuyers', {
          url: '/cumulativesalesbybuyers',
          templateUrl: '/template/businessinteligence/cumulativesalesbybuyers',
          data: {
              mainContentLabel: 'businessInteligence_cumulativeSalesByBuyers'
          }
      })
      .state('businessinteligence.cumulativeprocurementbyproducts', {
          url: '/cumulativeprocurementbyproducts',
          templateUrl: '/template/businessinteligence/cumulativeprocurementbyproducts',
          data: {
              mainContentLabel: 'businessInteligence_cumulativeProcurementByProducts'
          }
      })
      .state('businessinteligence.cumulativeprocurementbyplants', {
          url: '/cumulativeprocurementbyplants',
          templateUrl: '/template/businessinteligence/cumulativeprocurementbyplants',
          data: {
              mainContentLabel: 'businessInteligence_cumulativeProcurementByPlants'
          }
      })
      .state('businessinteligence.cumulativeprocurementbymonths', {
          url: '/cumulativeprocurementbymonths',
          templateUrl: '/template/businessinteligence/cumulativeprocurementbymonths',
          data: {
              mainContentLabel: 'businessInteligence_cumulativeProcurementByMonths'
          }
      })
      .state('businessinteligence.cumulativeprocurementbysuppliers', {
          url: '/cumulativeprocurementbysuppliers',
          templateUrl: '/template/businessinteligence/cumulativeprocurementbysuppliers',
          data: {
              mainContentLabel: 'businessInteligence_cumulativeProcurementBySuppliers'
          }
      })
      .state('businessinteligence.cumulativeprocurementrefundbysuppliers', {
          url: '/cumulativeprocurementrefundbysuppliers',
          templateUrl: '/template/businessinteligence/cumulativeprocurementrefundbysuppliers',
          data: {
              mainContentLabel: 'businessInteligence_cumulativeProcurementRefundBySuppliers'
          }
      })
      .state('businessinteligence.obsoletesupplies', {
          url: '/obsoletesupplies',
          templateUrl: '/template/businessinteligence/obsoletesupplies',
          data: {
              mainContentLabel: 'businessInteligence_obsoleteSupplies'
          }
      });

}]);