'use strict';

logisticsApp.directive('materialTypesLookup', ['localizationService', 'identityService',
    function (localizationService, identityService) {

    return {
        restrict: 'E',
        scope: {
            ngModel: '='
        },
        template: '<select class="select2 fullwidth" ui-select2="options" ng-model="ngModel" ng-options="materialType.id as materialType.code for materialType in materialTypes track by materialType.id " data-placeholder="{{dataPlaceholderLabel}}">' +
                        '<option value=""></option>' +
                    '</select>',
        controller: ['$scope', '$filter', 'logisticsMasterDataService', function ($scope, $filter, logisticsMasterDataService) {

            $scope.dataPlaceholderLabel = localizationService.getLabel('masterData_materialTypesLookup_MaterialType');
            $scope.options = { allowClear: true };

            var companyId = null;
            var identity = identityService.getIdentity();
            if (identity)
                companyId = identity.defaultCompanyId;

            logisticsMasterDataService
                .getMaterialTypes(companyId)
                .then(function (result) {
                    $scope.materialTypes = result;
                });
            
        }]
    };

}]);
