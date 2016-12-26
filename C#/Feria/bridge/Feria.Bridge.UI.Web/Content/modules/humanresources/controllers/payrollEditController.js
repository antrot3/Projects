'use strict';

humanResourcesApp.controller('payrollEditController', ['$scope', '$state', 'identityService', 'payrollService', 'humanResourcesMasterDataService','ngDialog', function ($scope, $state, identityService, payrollService, humanResourcesMasterDataService,ngDialog) {

    $scope.payroll = {};
    $scope.isNew = false;

    if ($state.params.id)
        payrollService.getPayroll($state.params.id).then(function (data) { $scope.payroll = data; });

    $scope.addAllEmployees = function (payroll) {

        humanResourcesMasterDataService.getEmployees(identityService.getIdentity().defaultCompanyId).then(function (employees) {
            var employeeArray = _.pluck(employees, 'id');
            payrollService.addEmployeesToPayroll(payroll.id, employeeArray).then(function () {
                $state.reload();
            });
        });
    };

    $scope.delete = function (payrollId, payrollItemId) {
        payrollService.deletePayrollItem(payrollId, payrollItemId).then(function () {
            $state.reload();
        });
    };

    $scope.deleteAll = function (payrollId) {
        payrollService.deletePayrollItems(payrollId).then(function () {
            $state.reload();
        });    
    };
    $scope.addEmployee = function(payroll)
    {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/PayrollItemAddNewEmployeeDialog',
            controller: ['$scope', '$state', 'identityService', 'payrollService', 'humanResourcesMasterDataService', function ($scope, $state, identityService, payrollService, humanResourcesMasterDataService) {
                $scope.payroll = payroll;
                payrollService.getEmployeesMissingFromPayroll(identityService.getIdentity().defaultCompanyId, $scope.payroll.id).then(function (employees) { $scope.employees = employees; });
                $scope.validation = [];
                $scope.validation['selectedEmployee'] = false;
                $scope.$watch("selectedEmployee", function (value) {
                    if ($scope.selectedEmployee != null)
                        $scope.validation['selectedEmployee'] = true;
                    else
                        $scope.validation['selectedEmployee'] = false;
                    
                    if ($scope.validation['selectedEmployee'])
                        $scope.validFlag = true;
                    else
                        $scope.validFlag = false;
                }, true);

                $scope.close = function () {

                    dialog.close()
                }
                $scope.savePayrollItem = function () {
                    payrollService.addEmployeesToPayroll($scope.payroll.id, [$scope.selectedEmployee]).then(function () {
                        dialog.close();
                        $state.reload();
                    });

                };

            }],
            className: 'ngdialog-theme-default',
            closeByDocument: false,
            closeByEscape: false,
            showClose: false,
            trapFocus: true,
            preserveFocus: true,
            scope: $scope
        });
    }

}]);