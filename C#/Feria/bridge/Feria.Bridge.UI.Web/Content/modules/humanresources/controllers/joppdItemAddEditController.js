'use strict';

humanResourcesApp.controller('joppdItemAddEditController', ['$q', '$scope', '$state', 'humanResourcesMasterDataService', 'identityService', 'joppdService', function ($q, $scope, $state, humanResourcesMasterDataService, identityService, joppdService) {

    $scope.joppdItem = {};
    $scope.isNew = false;

    $scope.employees = [];
    $scope.acquirerTypes = [];
    $scope.firstLastInsuranceMonthTypes = [];
    $scope.fullPartWorkingHourTypes = [];
    $scope.paymentMethodTypes = [];
    $scope.receiptTypes = [];
    $scope.specialContributionTypes = [];
    $scope.taxFreeReceiptTypes = [];
    $scope.workingExperienceTypes = [];

    if ($state.params.joppdId && $state.params.joppdItemId) {
        var p1 = joppdService.getJoppdAcquirerTypes().then(function (data) { $scope.acquirerTypes = data; });
        var p2 = joppdService.getJoppdFirstLastInsuranceMonthTypes().then(function (data) { $scope.firstLastInsuranceMonthTypes = data; });
        var p3 = joppdService.getJoppdFullPartWorkingHourTypes().then(function (data) { $scope.fullPartWorkingHourTypes = data; });
        var p4 = joppdService.getJoppdPaymentMethodTypes().then(function (data) { $scope.paymentMethodTypes = data; });
        var p5 = joppdService.getJoppdReceiptTypes().then(function (data) { $scope.receiptTypes = data; });
        var p6 = joppdService.getJoppdSpecialContributionTypes().then(function (data) { $scope.specialContributionTypes = data; });
        var p7 = joppdService.getJoppdTaxFreeReceiptTypes().then(function (data) { $scope.taxFreeReceiptTypes = data; });
        var p8 = joppdService.getJoppdWorkingExperienceTypes().then(function (data) { $scope.workingExperienceTypes = data; });

        $q.all([p1, p2, p3, p4, p5, p6, p7, p8]).then(function () {
            joppdService.getJoppdItem($state.params.joppdId, $state.params.joppdItemId).then(function(data) {
                $scope.joppdItem = data;
            }); 
        });
    } else {
        $scope.isNew = true;
        humanResourcesMasterDataService.getEmployees(identityService.getIdentity().defaultCompanyId).then(function (employees) { $scope.employees = employees; });
    }

    $scope.saveJoppdItem = function (joppdItem) {

        if ($scope.isNew) {
            joppdService.addEmployeesToJoppd($state.params.joppdId, [$scope.selectedEmployee]).then(function () {
                $state.go('humanresources.joppdedit', { id: $state.params.joppdId });
            });
        } else {

            joppdItem = _.extend(joppdItem, {
                joppdId: $state.params.joppdId,
                joppdItemId: $state.params.joppdItemId,
            });

            joppdService.updateJoppdItem(joppdItem).then(function () {
                $state.go('humanresources.joppdedit', { id: $state.params.joppdId });
            });
        }

    }; 

}]);