'use strict';

businessInteligenceApp.factory('businessInteligenceMasterDataService', ['$http', '$q', 'applicationSettings', function ($http, $q, applicationSettings) {

    return {

        getPlantZones: function (companyId) {

            var deferred = $q.defer();
            $http.get(applicationSettings.businessInteligenceAPIUrl + 'masterdata/plantzones/get', { params: { companyId: companyId } })
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }
    };
}]);