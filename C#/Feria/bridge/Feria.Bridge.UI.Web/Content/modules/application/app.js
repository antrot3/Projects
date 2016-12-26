'use strict';

var bridgeWebApp = angular.module('bridgeWebApp', ['ui.router', 'helpers', 'logistics', 'humanResources', 'businessInteligence', 'ngDialog']);

bridgeWebApp.config(['$provide', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($provide, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('signin', {
          url: '/signin',
          templateUrl: '/template/signin',
          publicAccess: true
      })
      .state('error', {
          url: '/error',
          templateUrl: '/template/error'
      })
      .state('signout', {
          url: '/signout',
          controller: 'signOutController',
          template: ''
      })
      .state('dashboard', {
          url: '/dashboard',
          views: {
              '': { templateUrl: '/template/dashboard' }
          },
          data: { mainContentLabel: 'dashboard' }
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $httpProvider.interceptors.push('authInterceptorService');
    $httpProvider.interceptors.push('errorInterceptorService');

    $provide.decorator('$exceptionHandler', ['$delegate', '$injector', 'applicationSettings', function ($delegate, $injector, applicationSettings) {
        return function (exception, cause) {

            var logService = $injector.get('logService');
            if (logService)
                logService.write(exception, cause);

            if (applicationSettings.environment != 'production')
                $delegate(exception, cause);
        };
    }]);

}]); 

bridgeWebApp.run(['$rootScope', '$location', 'identityService', 'localizationService', function ($rootScope, $location, identityService, localizationService) {

    $rootScope.$on('$stateChangeStart', function (event, next) {

        if (identityService.getIdentity() && next.publicAccess) {
            $location.path('/dashboard');
        } 
        else if (!identityService.getIdentity() && !next.publicAccess) {
            $location.path('/signin');
        }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {

        if (toState.data) {
            if (toState.data.mainContentLabel)
                $rootScope.mainContentTitle = localizationService.getLabel(toState.data.mainContentLabel);
        }
    });

}]);