'use strict';

humanResourcesApp.directive('educationalInstitutions', ['localizationService', 'humanResourcesMasterDataService', 'identityService', function (localizationService, humanResourcesMasterDataService, identityService) {

    return {
        restrict: "A",
        require: ["uiSelect", "ngModel"],
        compile: function compile(tElement, tAttrs, transclude) {
            tElement.append('<ui-select-match placeholder="{{dataPlaceholderLabel}}">{{$select.selected.name}}</ui-select-match>' +
                   '<ui-select-choices repeat="educationalInstitution.id as educationalInstitution in educationalInstitutions | filter: $select.search">' +
                   '<div ng-bind-html="educationalInstitution.name | highlight: $select.search"></div>' + '</ui-select-choices>');

            return {
                pre: function preLink(scope, iElement, iAttrs, controller) { },
                post: function postLink(scope, iElement, iAttrs, controller) {

                    humanResourcesMasterDataService.getEducationalInstitutions().then(function (result) {
                        scope.educationalInstitutions = result;
                    });
                }
            };
        }
    }
}]);


humanResourcesApp.directive('educationalRanks', ['localizationService', 'humanResourcesMasterDataService', 'identityService', function (localizationService, humanResourcesMasterDataService, identityService) {

    return {
        restrict: "A",
        require: ["uiSelect", "ngModel"],
        scope : false,
        compile: function compile(tElement, tAttrs, transclude) {
            tElement.append('<ui-select-match placeholder="{{dataPlaceholderLabel}}">{{$select.selected.name}}</ui-select-match>' +
                   '<ui-select-choices repeat="educationalRank.id as educationalRank in educationalRanksList | filter: $select.search">' +
                   '<div ng-bind-html="educationalRank.name | highlight: $select.search"></div>' + '</ui-select-choices>');

            return {
                pre: function preLink(scope, iElement, iAttrs, controller) { },
                post: function postLink(scope, iElement, iAttrs, controller) {
                    iAttrs.$observe("institution", function (value) {
                        humanResourcesMasterDataService.getEducationalRanks(value).then(function (data) {
                            scope.educationalRanksList = data;
                        });
                    });
                }
            };
        },
    };
}]);