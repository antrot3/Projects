'use strict';

humanResourcesApp.factory('joppdService', ['$http', '$q', 'applicationSettings', function ($http, $q, applicationSettings) {

    return {

        getJoppds: function (companyId, fromDate, toDate) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/list?companyId=' + companyId + '&fromDate=' + fromDate.toSerializable() + '&toDate=' + toDate.toSerializable())
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getJoppd: function (id) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/get?joppdId=' + id)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getJoppdItem: function (joppdId, joppdItemId) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/getitem?joppdId=' + joppdId + '&joppdItemId=' + joppdItemId)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        createJoppd: function (joppd) {

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/new', JSON.stringify(joppd))
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        addEmployeesToJoppd: function (joppdId, employeeIds) {

            var requestObject = {
                joppdId: joppdId,
                employeeIds: employeeIds
            };

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/addemployees', JSON.stringify(requestObject))
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        updateJoppdItem: function (joppdItemDetails) {

            var deferred = $q.defer();
            $http.put(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/updateitem', JSON.stringify(joppdItemDetails))
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        deleteJoppd: function (joppdId) {

            var deferred = $q.defer();
            $http.delete(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/delete?joppdId=' + joppdId)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        deleteJoppdItem: function (joppdId, joppdItemId) {
            
            var deferred = $q.defer();
            $http.delete(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/deleteitem?joppdId=' + joppdId + '&joppdItemId=' + joppdItemId)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        getJoppdReportTypes: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/getjoppdreporttypes')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getJoppdApplicantTypes: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/getjoppdapplicanttypes')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        getJoppdAcquirerTypes: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/getjoppdacquirertypes')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        getJoppdFirstLastInsuranceMonthTypes: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/getjoppdfirstlastinsurancemonthtypes')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        getJoppdFullPartWorkingHourTypes: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/getjoppdfullpartworkinghourtypes')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        getJoppdPaymentMethodTypes: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/getjoppdpaymentmethodtypes')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        getJoppdReceiptTypes: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/getjoppdreceipttypes')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        getJoppdSpecialContributionTypes: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/getjoppdspecialcontributiontypes')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        getJoppdTaxFreeReceiptTypes: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/getjoppdtaxfreereceipttypes')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        getJoppdWorkingExperienceTypes: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/joppd/getjoppdworkingexperiencetypes')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }

    };
}]);