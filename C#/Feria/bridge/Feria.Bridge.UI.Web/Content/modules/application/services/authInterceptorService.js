'use strict';

bridgeWebApp.factory('authInterceptorService', ['$q', '$injector', '$location', 'identityService', 'httpBufferService', 'applicationSettings', function ($q, $injector, $location, identityService, httpBufferService, applicationSettings) {

    var tokenRefreshing = false;

    var request = function (config) {

        config.headers = config.headers || {};

        var authenticationTokenApi = applicationSettings.authenticationAPIUrl + 'token'; 
        var identity = identityService.getIdentity();

        if (identity && config.url != authenticationTokenApi)
            config.headers.Authorization = 'Bearer ' + identity.token;

        return config;
    };

    var responseError = function (response) {

        if (response.status == 401) {

            var authService = $injector.get('authService');
            if (!authService)
                return $q.reject(response);

            var deferred = $q.defer(response);
            var identity = identityService.getIdentity();

            if (identity) {

                if (tokenRefreshing) {

                    httpBufferService.append(response.config, deferred);

                } else {

                    tokenRefreshing = true; 
                    httpBufferService.append(response.config, deferred);

                    authService.refresh().then(function (data) {

                        response.config.headers.Authorization = 'Bearer ' + data.access_token;
                        httpBufferService.retryAll(function (config) {
                            config.headers.Authorization = 'Bearer ' + data.access_token;
                            return config;
                        });

                        tokenRefreshing = false; 

                    }, function () {
                        httpBufferService.rejectAll();
                        identityService.unsetIdentity();
                        $location.path('/signin');
                    });
                }

                return deferred.promise; 
            }
        }

        return $q.reject(response);
    };

    return {
        request: request,
        responseError: responseError
    }; 

}]);