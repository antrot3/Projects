'use strict';

humanResourcesApp.controller('employeeAddController', ['$scope', '$state', 'humanResourcesMasterDataService', 'humanResourcesEmployeeService', 'localizationService', 'identityService', function ($scope, $state, humanResourcesMasterDataService, humanResourcesEmployeeService, localizationService, identityService) {

    $scope.employee = {};
    humanResourcesMasterDataService.getTowns().then(function (data) {
        $scope.towns = data;
    });
    $scope.InsertEmployee = function (employee) {
        
        if ($state.params.id) {
            employee.Id = $state.params.id;
        }
        employee.companyId = identityService.getIdentity().defaultCompanyId;
        humanResourcesEmployeeService.saveEmployee(employee).then(function () {
            $state.go('humanresources.employees');
        }); 
    };

    
}]);
