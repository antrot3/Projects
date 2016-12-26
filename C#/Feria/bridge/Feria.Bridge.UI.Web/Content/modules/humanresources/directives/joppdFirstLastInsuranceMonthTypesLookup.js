'use strict';

humanResourcesApp.directive('joppdFirstLastInsuranceMonthTypesLookup', ['localizationService', 'joppdService', function (localizationService, joppdService) {

    return {
        restrict: "E",
        scope: {
            ngModel: '='

        },

        template: '<ui-select ng-model="$parent.$parent.salaryAddition.selectedFirstLastInsuranceMonthTypeId" theme="select2"  style="width:100%; margin-bottom:4%;">' +
                   '<ui-select-match placeholder="{{dataPlaceholderLabel}}">{{$select.selected.code}}</ui-select-match>' +
                   '<ui-select-choices repeat="joppdFirstLastInsuranceMonthType.id as joppdFirstLastInsuranceMonthType in joppdFirstLastInsuranceMonthTypes | filter: $select.search">' +
                   '<div ng-bind-html="printFirstLastInsuranceMonthType(joppdFirstLastInsuranceMonthType) | highlight: $select.search"></div>' + '</ui-select-choices>' +
                   '</ui-select>',
        controller: ['$scope', 'joppdService', function ($scope, joppdService) {

            $scope.options = {
                allowClear: true,
            };
            $scope.dataPlaceholderLabel = localizationService.getLabel('humanResources_joppdFirstLastInsuranceMonthType_placeholderLabel');

            joppdService.getJoppdFirstLastInsuranceMonthTypes($scope.selectedFirstLastInsuranceMonthTypeId).then(function (result) {
                $scope.joppdFirstLastInsuranceMonthTypes = result;

            });
            
            
            $scope.printFirstLastInsuranceMonthType = function (joppdFirstLastInsuranceMonthType) {
                return joppdFirstLastInsuranceMonthType.code + ' - ' + joppdFirstLastInsuranceMonthType.type;
            };
        }]
    };
}]);