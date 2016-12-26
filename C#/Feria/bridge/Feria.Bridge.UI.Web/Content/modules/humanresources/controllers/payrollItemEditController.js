'use strict';

humanResourcesApp.controller('payrollItemEditController', ['$scope', '$state', 'identityService', 'humanResourcesMasterDataService', 'payrollService', function ($scope, $state, identityService, humanResourcesMasterDataService, payrollService) {

    $scope.grossAmount = 0;
    $scope.workingHours = [];

    $scope.workingHourTypes = {};
    payrollService.getPayrollItem($state.params.payrollItemId).then(function (data) {
        $scope.payrollItem = data
        payrollService.getPayrollWorkingHourTypes($state.params.payrollId).then(function (data) {
            $scope.workingHourTypes = data;
            angular.forEach($scope.payrollItem.workingHoursList, function (item) {
                angular.forEach($scope.workingHourTypes, function (type) {
                    if (type.id == item.workingHourFactorId)
                    {
                        type.hours = item.hours;
                    }
                });
            });
        });
    });
    
    $scope.savePayrollItem = function () {

            var payrollItemDetails = {
                payrollId: $state.params.payrollId,
                payrollItemId: $state.params.payrollItemId,
                grossAmount: parseFloat($scope.payrollItem.grossAmount),
                workingHours: _.map($scope.workingHourTypes, function (item) { return { workingHourFactorId: item.id, hours: parseInt(item.hours) }; })
            };
            payrollService.updatePayrollItem(payrollItemDetails).then(function () {
                $state.reload();
                bootbox.dialog({
                    message: "Promjene su uspješno spremljene",
                    title: "Obavijest",
                    buttons: {
                        success: {
                            label: "OK",
                            className: "btn-success",
                            callback: function () {
                            }
                        }
                    }
                });
            });
    };
    $scope.close = function () {
        $state.go('humanresources.payrolledit', { id: $state.params.payrollId });
    };

}]);