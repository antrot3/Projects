'use strict';

humanResourcesApp.directive('countiesLookup', ['localizationService', 'humanResourcesMasterDataService','identityService', function (localizationService, humanResourcesMasterDataService, identityService) {

    return {
        restrict: "E",
        scope: {
            ngModel: '='
         
        },
        
        template: '<ui-select ng-model="$parent.$parent.town.selectedCountyId" theme="select2"  style="width: 300px; margin-bottom:4%;">' +
                   '<ui-select-match placeholder="{{dataPlaceholderLabel}}">{{$select.selected.name}}</ui-select-match>' +
                   '<ui-select-choices repeat="county.id as county in counties | filter: $select.search">' +
                   '<div ng-bind-html="county.name | highlight: $select.search"></div>' +'</ui-select-choices>' +
                   '</ui-select>',
        controller: ['$scope', 'humanResourcesMasterDataService', function ($scope, humanResourcesMasterDataService) {
            $scope.options = { allowClear: true };
            $scope.dataPlaceholderLabel = localizationService.getLabel('humanResources_countiesLookup_placeholderLabel');

            humanResourcesMasterDataService.getCounties($scope.selectedCountyId).then(function (result) {
                $scope.counties = result;
            });

            $scope.printCounty = function (county) {
                return county.name;
            }
            
        }]
    };
}]);
