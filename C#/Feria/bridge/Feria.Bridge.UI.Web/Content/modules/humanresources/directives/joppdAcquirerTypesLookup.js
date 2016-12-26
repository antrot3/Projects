'use strict';

humanResourcesApp.directive('joppdAcquirerTypesLookup', ['localizationService', 'joppdService', function (localizationService, joppdService) {

    return {
        restrict: "E",
        scope: {
            ngModel: '='

        },

        template: '<ui-select ng-model="$parent.$parent.salaryAddition.selectedAcquirerTypeId" theme="select2"  style="width:100%; margin-bottom:4%;">' +
                   '<ui-select-match placeholder="{{dataPlaceholderLabel}}">{{$select.selected.code}}</ui-select-match>' +
                   '<ui-select-choices repeat="joppdAcquirerType.id as joppdAcquirerType in joppdAcquirerTypes | filter: $select.search">' +
                   '<div ng-bind-html="printAcquirerType(joppdAcquirerType) | highlight: $select.search"></div>' + '</ui-select-choices>' +
                   '</ui-select>',
        controller: ['$scope', 'joppdService', function ($scope, joppdService) {
            
            $scope.options = {
                allowClear: true,
            };

            $scope.dataPlaceholderLabel = localizationService.getLabel('humanResources_joppdAcquirerType_placeholderLabel');

            joppdService.getJoppdAcquirerTypes($scope.selectedAcquirerTypeId).then(function (result) {
                $scope.joppdAcquirerTypes = result;

            });


                $scope.printAcquirerType = function (joppdAcquirerType) {
                    return joppdAcquirerType.code + ' - ' + joppdAcquirerType.type;
                };
        }]
    };
}]);