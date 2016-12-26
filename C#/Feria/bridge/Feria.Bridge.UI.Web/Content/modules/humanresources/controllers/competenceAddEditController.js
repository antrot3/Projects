'use strict';

humanResourcesApp.controller('competenceAddEditController', ['$scope', '$state', 'identityService','humanResourcesMasterDataService', function ($scope, $state,identityService, humanResourcesMasterDataService) {

    $scope.competence = {};

    if ($state.params.id) {
        humanResourcesMasterDataService.getCompetence($state.params.id).then(function (data) {
            $scope.competence = data;
        });
    }
    $scope.resetCompetence = function () {

            $state.go('humanresources.competences');
        
    };


    $scope.saveCompetence = function (competence,isValid) {
        if (isValid) {
            if ($state.params.id) {
                competence.Id = $state.params.id;
            }
                competence.companyId = identityService.getIdentity().defaultCompanyId;
                humanResourcesMasterDataService.saveCompetence(competence).then(function () {
                    $state.go('humanresources.competences');
                });
             }
        }

}]);
