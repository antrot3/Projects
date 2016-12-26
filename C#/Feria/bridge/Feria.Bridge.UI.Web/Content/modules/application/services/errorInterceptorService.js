'use strict';

bridgeWebApp.factory('errorInterceptorService', ['$q', '$location', function ($q, $location) {

    return {
        responseError: function (response) {

            if (response.status >= 500)
                $location.path('/error');

            return $q.reject(response);
        }
    };

}]);