'use strict';

humanResourcesApp.directive('countriesLookup', ['localizationService', function (localizationService) {

    return {
        restrict: "E",
        scope: {
            ngModel: '='
  
        },
       
        template: '<ui-select ng-model="$parent.$parent.countryId" theme="select2"  style="width: 30% !important;" title="Single property binding with async data">' +
                  '<ui-select-match placeholder="{{dataPlaceholderLabel}}">{{$select.selected.name}}</ui-select-match>' +
                  ' <ui-select-choices repeat="country.id as country in countries | filter: $select.search">' +
                  '<div ng-bind-html="country.name | highlight: $select.search"></div>' +
                  '</ui-select-choices>' +
                  '</ui-select>',
        controller: ['$scope', 'humanResourcesMasterDataService', function ($scope, humanResourcesMasterDataService) {
            
            $scope.options = {
                allowClear: true,
                };
            $scope.dataPlaceholderLabel = localizationService.getLabel('humanResources_countriesLookup_placeholderLabel');

            humanResourcesMasterDataService.getCountries($scope.selectedCountryId).then(function (result) {
                $scope.countries = result;

            });

            
            $scope.printCountry = function (country){
                return country.name;
            }
        }]
        };  
}]);