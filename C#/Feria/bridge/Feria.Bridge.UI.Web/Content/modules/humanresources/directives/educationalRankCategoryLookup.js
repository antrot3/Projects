'use strict';

humanResourcesApp.directive('educationalRankCategoryLookup', ['localizationService', 'humanResourcesMasterDataService','identityService', function (localizationService, humanResourcesMasterDataService, identityService) {

    return {
        restrict: "E",
        scope: {
            ngModel: '='
         
        },
       
        
        template: '<ui-select  theme="select2" ng-model="$parent.$parent.educationalRank.category"  style="width: 100%">' +
            '<ui-select-match placeholder="{{dataPlaceholderLabel}}">{{$select.selected}}</ui-select-match>' +
            ' <ui-select-choices repeat="rank in ranks | filter: $select.search">' +
            '<div ng-bind-html="rank | highlight: $select.search"></div>'+
            '</ui-select-choices>'+
            '</ui-select>',

        controller: ['$scope', 'localizationService', 'humanResourcesMasterDataService', function ($scope,localizationService, humanResourcesMasterDataService) {
            $scope.options = { allowClear: true };
            $scope.dataPlaceholderLabel = localizationService.getLabel('humanResources_educationalRankCategoryLookup_rankCategory');
			
            humanResourcesMasterDataService.getEducationalRanksEnum($scope.rankCategory).then(function(result){
                $scope.ranks = result;
                
            });
            
        }]
    };
}]);
