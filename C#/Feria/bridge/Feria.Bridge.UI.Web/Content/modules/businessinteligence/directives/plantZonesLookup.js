'use strict';

businessInteligenceApp.directive('plantZonesLookup', ['localizationService', function (localizationService) {

    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            company: '='
        },
        template: '<select class="select2 fullwidth" ui-select2="options" ng-model="ngModel" ng-options="plantZone.id as printPlantZone(plantZone) for plantZone in plantZones track by plantZone.id" data-placeholder="{{dataPlaceholderLabel}}">' +
                      '<option value=""></option>' +
                  '</select>',
        controller: ['$scope', 'businessInteligenceMasterDataService', function ($scope, businessInteligenceMasterDataService) {

            $scope.dataPlaceholderLabel = localizationService.getLabel('businessInteligence_plantZonesLookup_placeholderLabel');
            $scope.options = { allowClear: true };

            businessInteligenceMasterDataService.getPlantZones($scope.company).then(function (result) {
                $scope.plantZones = result;
            });

            $scope.printPlantZone = function (plantZone) {
                return plantZone.code + ' - ' + plantZone.name;
            };
        }]
    };

}]);