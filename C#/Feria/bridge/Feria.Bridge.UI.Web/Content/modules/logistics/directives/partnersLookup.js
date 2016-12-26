'use strict';

logisticsApp.directive('partnersLookup', ['localizationService', function (localizationService) {

    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            company: '=',
            partnerTypes: '='
        },
        template: '<select class="select2 fullwidth" ui-select2="options" ng-model="ngModel" ng-options="partner.id as printPartner(partner) for partner in partners track by partner.id" data-placeholder="{{dataPlaceholderLabel}}">' + 
                      '<option value=""></option>' +
                  '</select>',
        controller: ['$scope', 'logisticsMasterDataService', function ($scope, logisticsMasterDataService) {

            $scope.dataPlaceholderLabel = localizationService.getLabel('logistics_partnersLookup_placeholderLabel');
            $scope.options = { allowClear: true };

            logisticsMasterDataService.getPartners($scope.company, $scope.partnerTypes).then(function (result) {
                $scope.partners = result;
            });

            $scope.printPartner = function (partner) {
                return partner.code + ' - ' + partner.name;
            };
        }]
    };

}]);