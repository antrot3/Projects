'use strict';

logisticsApp.directive('materialGroupsLookup', ['logisticsMasterDataService', 'localizationService', 'identityService',
    function (logisticsMasterDataService, localizationService, identityService) {

        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                materialtype: '='
            },
            link: function (scope, element, attrs) {
                scope.$watch(function() {
                    return scope.materialtype;
                }, function (materialTypeIdNew, materialTypeIdOld) {
                 
                    var companyId = null;
                    var identity = identityService.getIdentity();
                    if (identity)
                        companyId = identity.defaultCompanyId;

                    logisticsMasterDataService
                        .getMaterialGroups(companyId, materialTypeIdNew)
                        .then(function (result) {
                            scope.materialGroups = result;
                        });

                    // Clear ngModel in case that materialTypeId is changed
                    if (materialTypeIdOld != undefined) {
                        scope.ngModel = undefined;
                    }
                });
            },
            template: '<select class="select2 fullwidth" ui-select2="options" ng-options="materialGroup.id as materialGroup.display for materialGroup in materialGroups track by materialGroup.id" ng-model="ngModel" data-placeholder="{{dataPlaceholderLabel}}">' +
                            '<option value=""></option>' +
                        '</select>',
            controller: ['$scope', '$filter', function($scope, $filter) {

                $scope.dataPlaceholderLabel = localizationService.getLabel('masterData_materialGroupsLookup_MaterialGroup');
                $scope.options = { allowClear: true };

                var companyId = null;
                var identity = identityService.getIdentity();
                if (identity)
                    companyId = identity.defaultCompanyId;
                
                logisticsMasterDataService
                    .getMaterialGroups(companyId, $scope.materialtype)
                    .then(function(result) {
                        $scope.materialGroups = result;
                });
            }]
        };
}]);