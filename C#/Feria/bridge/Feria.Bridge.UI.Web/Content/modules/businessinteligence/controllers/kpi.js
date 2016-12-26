'use strict';

businessInteligenceApp.controller('kpi', ['$scope', 'reportsService', 'identityService', 'localizationService',
    function ($scope, reportsService, identityService, localizationService) {

        $scope.kpi = null;
        
        reportsService.getKpi()
            .then(function (result) {
                $scope.kpi = result;
        });

}]);