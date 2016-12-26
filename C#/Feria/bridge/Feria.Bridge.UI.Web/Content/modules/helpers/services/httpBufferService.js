'use strict';

helpersApp.factory('httpBufferService', ['$injector', function ($injector) {

    var buffer = [];
    var $http;

    function retryHttpRequest (config, deferred) {

        function successCallback (response) {
            deferred.resolve(response);
        }

        function errorCallback (response) {
            deferred.reject(response);
        }

        $http = $http || $injector.get('$http');
        $http(config).then(successCallback, errorCallback);
    }

    return {

        append: function (config, deferred) {
            buffer.push({
                config: config,
                deferred: deferred
            });
        },

        rejectAll: function (reason) {
            if (reason) {
                for (var i = 0; i < buffer.length; ++i) {
                    buffer[i].deferred.reject(reason);
                }
            }
            buffer = [];
        },

        retryAll: function(updater) {
            for (var i = 0; i < buffer.length; ++i) {
                retryHttpRequest(updater(buffer[i].config), buffer[i].deferred);
            }
            buffer = [];
        }
    };

}]);