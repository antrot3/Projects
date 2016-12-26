'use strict';

humanResourcesApp.factory('payrollService', ['$http', '$q', 'applicationSettings', function ($http, $q, applicationSettings) {

    return {

        getPayrolls: function (companyId, fromDate, toDate) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/payroll/list?companyId=' + companyId + '&fromDate=' + fromDate+ '&toDate=' + toDate)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        getPayrollCardPdf: function (id) {

            var deferred = $q.defer();

            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/payroll/PrintPayrollCard?payrollId=' + id, { responseType: 'arraybuffer' })
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });

            return deferred.promise;

        },

        getPayroll: function (id) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/payroll/get?payrollId=' + id)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getPayrollWorkingHourTypes: function (id) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/payroll/getworkinghourtypes?payrollId=' + id)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getPayrollItem: function (payrollItemId) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/payroll/getPayrollItem?payrollItemId=' + payrollItemId)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getEmployeesMissingFromPayroll: function (companyId, payrollId) {
            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'documents/payroll/getEmployeesMissingFromPayroll?companyId=' + companyId + '&PayrollId=' + payrollId)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },
        createPayroll: function (payroll) {

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'documents/payroll/new', JSON.stringify(payroll))
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        addEmployeesToPayroll: function (payrollId, employeeIds) {

            var requestObject = {
                payrollId: payrollId,
                employeeIds: employeeIds
            }; 

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'documents/payroll/addemployees', JSON.stringify(requestObject))
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        updatePayrollItem: function (payrollItemDetails) {

            var deferred = $q.defer();
            $http.put(applicationSettings.humanResourcesAPIUrl + 'documents/payroll/updateitem', JSON.stringify(payrollItemDetails))
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        deletePayroll: function(payrollId) {
            
            var deferred = $q.defer();
            $http.delete(applicationSettings.humanResourcesAPIUrl + 'documents/payroll/delete?payrollId=' + payrollId)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }, 

        deletePayrollItem: function(payrollId, payrollItemId) {
            
            var deferred = $q.defer();
            $http.delete(applicationSettings.humanResourcesAPIUrl + 'documents/payroll/deleteitem?payrollId=' + payrollId + '&payrollItemId=' + payrollItemId)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        deletePayrollItems: function(payrollId) {
            
        var deferred = $q.defer();
        $http.delete(applicationSettings.humanResourcesAPIUrl + 'documents/payroll/deleteitems?payrollId=' + payrollId)
            .success(function (response) { deferred.resolve(response); })
            .error(function (err, status) { deferred.reject(err); });
        return deferred.promise;
    }

    };
}]);