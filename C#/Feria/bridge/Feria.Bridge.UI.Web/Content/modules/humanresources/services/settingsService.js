'use strict';

humanResourcesApp.factory('settingsService', ['$http', '$q', 'applicationSettings', function ($http, $q, applicationSettings) {

    return {

        getFeesFromSalary: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'settings/fees/getFeeFromSalaryList')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        getFeesToSalary: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'settings/fees/getFeeToSalaryList')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getFeeToSalary: function (id) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'settings/fees/getFeeToSalary?feeToSalaryId=' + id)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getFeeFromSalary: function (id) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'settings/fees/getFeeFromSalary?feeFromSalaryId=' + id)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        deactivateFeeFromSalary: function (id) {

            var urlData = 'feeFromSalaryId=' + id;


            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'settings/fees/deactivateFeeFromSalary', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        deactivateFeeToSalary: function (id) {

            var urlData = 'feeToSalaryId=' + id;


            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'settings/fees/deactivateFeeToSalary', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },
    
        updateFeeToSalary: function (feeToSalary, id) {

            var urlData = 'feeToSalaryId=' + id;
            urlData += '&name=' + feeToSalary.name;
            urlData += '&percentage=' + feeToSalary.percentage;
            
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'settings/fees/updateFeeToSalary', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        
        },
    

        updateFeeFromSalary: function (feeFromSalary,id) {
            
            var urlData = 'feeFromSalaryId=' + id;
            urlData += '&name=' + feeFromSalary.name;
            urlData += '&percentage=' + feeFromSalary.percentage;

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'settings/fees/updateFeeFromSalary', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        getSalaryTaxes: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'settings/salarytax/getSalaryTaxList')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getSalaryTax: function (id) {


            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'settings/salarytax/getSalaryTax?salaryTaxId=' + id)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        deactivateSalaryTax: function (id) {

            var urlData = 'salaryTaxId=' + id;


            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'settings/salarytax/deactivateSalaryTax', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        updateSalaryTax: function (salaryTax, id) {

            var urlData = 'salaryTaxId=' + id;
            urlData += '&upperAmount=' + salaryTax.upperAmount;
            urlData += '&percentage=' + salaryTax.percentage;
            
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'settings/salarytax/updateSalaryTax', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        
        },

        getWorkingHourFactors: function (companyId) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'settings/workingHourFactor/getWorkingHourFactorsList?companyId=' + companyId)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },
        
        getWorkingHourFactor: function (Id) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'settings/workingHourFactor/getWorkingHourFactor?Id=' + Id)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        saveWorkingHourFactor: function (id,workingHourFactor) {

            var urlData = 'CompanyId=' + id;
            urlData += '&factor=' + workingHourFactor.factor;
            urlData += '&workingHourType=' + workingHourFactor.workingHourType;
            urlData += '&showOnPage=' + workingHourFactor.showOnPage;
            if (workingHourFactor.id != null)
            {
                urlData += '&id=' + workingHourFactor.id;
            }
            if (workingHourFactor.type != null && workingHourFactor.description != null) {
                urlData += '&type=' + workingHourFactor.type;
            }

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'settings/workinghourfactor/saveWorkingHourFactor', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },
    };
}]);