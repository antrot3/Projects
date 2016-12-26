'use strict';

logisticsApp.controller('productController', ['$scope', 'localizationService', 'logisticsMasterDataService', 'identityService',
    function ($scope, localizationService, logisticsMasterDataService, identityService) {

        $scope.currentCompanyId = null;

        var identity = identityService.getIdentity();
        if (identity)
            $scope.currentCompanyId = identity.defaultCompanyId;
        
        $scope.product = [];
        $scope.product.classification1 = '';
        $scope.product.classification2 = '';
        $scope.edit = false;
        
        $scope.getProduct = function(productFilter) {
  
            logisticsMasterDataService
                 .getProduct($scope.currentCompanyId, productFilter.externalCode, productFilter.name, productFilter.barCode)
                 .then(function (result) {
                     $scope.product = result;
                     if (result != null) {
                         $scope.product.classification1 = result.classification[0] + result.classification[1];
                         $scope.product.classification2 = result.classification[2];
                     }
            });
        };

        $scope.resetProduct = function () {
            $scope.product = [];
            $scope.productFilter.externalCode = null;
            $scope.edit = false;
        };

        $scope.editAction = function() {
            $scope.edit = true;
        };

        $scope.resetAction = function(product) {
            $scope.edit = false;
            // Reload product
            // $scope.product = $scope.getProduct(product);

        };

        $scope.saveProduct = function(product) {

            // Update and reload product
            logisticsMasterDataService
                .updateProduct($scope.currentCompanyId, product)
                .then(function (result) {
                    $scope.edit = false;
                    $scope.product = $scope.getProduct(product);
           });
        };
       
    }]);