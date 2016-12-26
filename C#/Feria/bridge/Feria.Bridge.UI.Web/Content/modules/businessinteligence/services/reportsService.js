'use strict';

businessInteligenceApp.factory('reportsService', ['$http', '$q', 'applicationSettings', function ($http, $q, applicationSettings) {

    var _getReport = function (relativeUrl, filters) {
        
        var deferred = $q.defer();
        $http.post(applicationSettings.businessInteligenceAPIUrl + relativeUrl, JSON.stringify(filters))
            .success(function (response) { deferred.resolve(response); })
            .error(function (err, status) { deferred.reject(err); });
        return deferred.promise;

    };

    var _transformFilters = function (filters) {

        var transformedFilters = _.extend({}, filters);

        if (transformedFilters.fromDate) {
            var fromDate = transformedFilters.fromDate.split('.');
            if (fromDate.length == 3)
                transformedFilters.fromDate = fromDate[2] + '-' + fromDate[1] + '-' + fromDate[0];
        }

        if (transformedFilters.toDate) {
            var toDate = transformedFilters.toDate.split('.');
            if (toDate.length == 3)
                transformedFilters.toDate = toDate[2] + '-' + toDate[1] + '-' + toDate[0];
        }

        return transformedFilters; 
    };

    return {

        getCumulativeSalesByProducts: function (filters) {
            return _getReport('logistics/reports/CumulativeSalesByProducts', _transformFilters(filters));
        }, 

        getCumulativeSalesByPlants: function (filters) {
            return _getReport('logistics/reports/CumulativeSalesByPlants', _transformFilters(filters));
        },

        getCumulativeSalesByMonths: function (filters) {
            return _getReport('logistics/reports/CumulativeSalesByMonths', _transformFilters(filters));
        }, 

        getCumulativeSalesByBuyers: function (filters) {
            return _getReport('logistics/reports/CumulativeSalesByBuyers', _transformFilters(filters));
        }, 

        getCumulativeProcurementByProducts: function (filters) {
            return _getReport('logistics/reports/CumulativeProcurementByProducts', _transformFilters(filters));
        }, 

        getCumulativeProcurementByPlants: function (filters) {
            return _getReport('logistics/reports/CumulativeProcurementByPlants', _transformFilters(filters));
        }, 

        getCumulativeProcurementByMonths: function (filters) {
            return _getReport('logistics/reports/CumulativeProcurementByMonths', _transformFilters(filters));
        }, 

        getCumulativeProcurementBySuppliers: function (filters) {
            return _getReport('logistics/reports/CumulativeProcurementBySuppliers', _transformFilters(filters));
        }, 

        getCumulativeProcurementRefundBySuppliers: function (filters) {
            return _getReport('logistics/reports/CumulativeProcurementRefundBySuppliers', _transformFilters(filters));
        }, 

        getObsoleteSupplies: function (filters) {
            return _getReport('logistics/reports/ObsoleteSupplies', _transformFilters(filters));
        },

        getKpi: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.businessInteligenceAPIUrl + 'logistics/kpi/get')
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }

    };
}]);