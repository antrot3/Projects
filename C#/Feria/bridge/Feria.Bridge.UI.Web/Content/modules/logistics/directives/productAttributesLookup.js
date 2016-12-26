'use strict';

logisticsApp.directive('productAttributesLookup', ['localizationService', function (localizationService) {

    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            company: '='
        },
        template: '<div class="form-group" ng-repeat="attribute in productAttributes track by attribute.id">' +
                      '<select class="select2 fullwidth" ui-select2="options" ng-model="values[attribute.id]" ng-options="item.id as item.name for item in attribute.items track by item.id"  ng-change="update(attribute.id, values[attribute.id])" data-placeholder="{{labels[attribute.id]}}">' +
                          '<option value=""></option>' +
                      '</select>' + 
                  '</div>',
        controller: ['$scope', '$filter', 'logisticsMasterDataService', function ($scope, $filter, logisticsMasterDataService) {

            $scope.labels = {};
            $scope.isInitialized = false;
            $scope.options = { allowClear: true };

            logisticsMasterDataService.getProductAttributes($scope.company).then(function (result) {
                _.each(result, function (resultItem) {
                    $scope.labels[resultItem.id] = $filter('stringFormat')(localizationService.getLabel('logistics_productAttributesLookups_select'), [resultItem.name]);
                });

                $scope.productAttributes = result;
                $scope.isInitialized = true;
            });

            $scope.update = function (attributeKey, attributeValue) {

                $scope.ngModel = $scope.ngModel || [];
                var existingAttributeId = _.where($scope.ngModel, { 'attributeId': attributeKey });

                if (existingAttributeId.length == 1) {
                    if (typeof attributeValue == 'undefined')
                        $scope.ngModel = _.without($scope.ngModel, existingAttributeId[0]);
                    else
                        existingAttributeId[0].attributeItemId = attributeValue;
                }
                else {
                    $scope.ngModel.push({ attributeId: attributeKey, attributeItemId: attributeValue });
                }
            };
        }]
    };

}]);