'use strict';

humanResourcesApp.directive('joppdTaxFreeReceiptTypesLookup', ['localizationService', 'joppdService', function (localizationService, joppdService) {

    return {
        restrict: "E",
        scope: {
            ngModel: '='

        },

        template: '<ui-select ng-model="$parent.$parent.salaryAddition.selectedTaxFreeReceiptTypeId" theme="select2"  style="width:100%; margin-bottom:4%;">' +
                   '<ui-select-match placeholder="{{dataPlaceholderLabel}}">{{$select.selected.code}}</ui-select-match>' +
                   '<ui-select-choices repeat="joppdTaxFreeReceiptType.id as joppdTaxFreeReceiptType in joppdTaxFreeReceiptTypes | filter: $select.search">' +
                   '<div ng-bind-html="printTaxFreeReceiptType(joppdTaxFreeReceiptType) | highlight: $select.search"></div>' + '</ui-select-choices>' +
                   '</ui-select>',
        controller: ['$scope', 'joppdService', function ($scope, joppdService) {

            $scope.options = {
                allowClear: true,
            };

            $scope.dataPlaceholderLabel = localizationService.getLabel('humanResources_joppdTaxFreeReceipt_placeholderLabel');

            joppdService.getJoppdTaxFreeReceiptTypes($scope.selectedTaxFreeReceiptTypeId).then(function (result) {
                $scope.joppdTaxFreeReceiptTypes = result;

            });


            $scope.printTaxFreeReceiptType = function (joppdTaxFreeReceiptType) {
                return joppdTaxFreeReceiptType.code + ' - ' + joppdTaxFreeReceiptType.type;
            };
        }]
    };
}]);