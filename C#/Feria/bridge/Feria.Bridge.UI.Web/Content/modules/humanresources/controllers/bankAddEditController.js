'use strict';

humanResourcesApp.controller('bankAddEditController', ['$scope','localizationService', '$state', 'humanResourcesMasterDataService', 'identityService',
    function ($scope, localizationService, $state, humanResourcesMasterDataService, identityService) {
 
        $scope.bank = {};
        $scope.edit = true;
        
        if ($state.params.id) {
            humanResourcesMasterDataService.getBank($state.params.id).then(function (data) {
                $scope.bank = data;
            });
        }
        
         $scope.saveBank = function (bank) {
            humanResourcesMasterDataService
              .updateBank(bank)
                  .then(function (result) {                  
                      $state.go('humanresources.banks'); 
                      $scope.edit = false;
              });
         };
         
}]); 







