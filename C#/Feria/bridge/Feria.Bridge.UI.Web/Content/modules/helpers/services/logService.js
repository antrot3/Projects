'use strict';

helpersApp.factory('logService', ['$http', 'applicationSettings', function ($http, applicationSettings) {

    return {
        write: function (exception, cause) {

            var data = {
                exception: exception.toString(),
                trace: exception.stack,
                cause: cause
            }; 

            $http.post(applicationSettings.applicationUrl + 'log/write', data, { headers: { 'Content-Type': 'application/json' } }).catch();
        }
    };

}]);