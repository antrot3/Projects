'use strict';

logisticsApp.factory('logisticsMasterDataService', ['$http', '$q', 'applicationSettings', function ($http, $q, applicationSettings) {

    return {
       

        getPlants: function (companyId, plantTypes) {

            var deferred = $q.defer();
            $http.get(applicationSettings.logisticsAPIUrl + 'masterdata/plants/get', { params: { companyId: companyId, plantType: plantTypes } })
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getPartners: function (companyId, partnerTypes) {

            var deferred = $q.defer();
            $http.get(applicationSettings.logisticsAPIUrl + 'masterdata/partners/get', { params: { companyId: companyId, partnerType: partnerTypes } })
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getProductAttributes: function (companyId) {

            var deferred = $q.defer();
            $http.get(applicationSettings.logisticsAPIUrl + 'masterdata/productattributes/get', { params: { companyId: companyId } })
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getMaterialTypes: function(companyId) {

            var deferred = $q.defer();
            $http.get(applicationSettings.logisticsAPIUrl + 'masterdata/products/materialtypes', { params: { companyId: companyId } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        getMaterialGroups: function (companyId, materialTypeId) {

            var deferred = $q.defer();
            $http.get(applicationSettings.logisticsAPIUrl + 'masterdata/products/materialgroups', { params: { companyId: companyId, materialTypeId: materialTypeId } })
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        getProduct: function(companyId, externalCode, name, barCode) {
            
            var deferred = $q.defer();
            $http.get(applicationSettings.logisticsAPIUrl + 'masterdata/products/product', { params: { companyId: companyId, externalCode: externalCode, name: name, barCode: barCode } })
                .success(function (response) {
                    deferred.resolve(response);                    
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        updateProduct: function (companyId, data) {

            var urlData = 'companyId=' + companyId;
            urlData += '&productId=' + data.id;
            if (data.materialType != null) {
                urlData += '&materialTypeId=' + data.materialType.id;
            }
            if (data.materialGroup != null) {
                urlData += '&materialGroupId=' + data.materialGroup.id;
            }

            var deferred = $q.defer();
            $http.post(applicationSettings.logisticsAPIUrl + 'masterdata/products/product/update', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(err, status) {
                    deferred.reject(err);
                });
           return deferred.promise;
        }
    };
}]);