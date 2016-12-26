'use strict';

logisticsApp.directive('plantsLookup', ['localizationService', function (localizationService) {

    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            company: '=',
            plantTypes: '='
        },
        template: '<select class="select2 fullwidth" ui-select2="options" ng-model="ngModel" ng-options="plant.id as printPlant(plant) for plant in plants track by plant.id" data-placeholder="{{dataPlaceholderLabel}}">' + 
                      '<option value=""></option>' +
                  '</select>',
        controller: ['$scope', 'logisticsMasterDataService', function ($scope, logisticsMasterDataService) {

            $scope.dataPlaceholderLabel = localizationService.getLabel('logistics_plantsLookup_placeholderLabel');
            $scope.options = { allowClear: true }; 

            logisticsMasterDataService.getPlants($scope.company, $scope.plantTypes).then(function (result) {
                $scope.plants = result;
            });

            $scope.printPlant = function (plant) {
                return plant.code + ' - ' + plant.name; 
            }; 
        }]
    };

}]);