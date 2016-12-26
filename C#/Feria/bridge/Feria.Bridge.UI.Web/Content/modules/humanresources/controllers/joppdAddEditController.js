'use strict';

humanResourcesApp.controller('joppdAddEditController', ['$scope', '$state', 'identityService', 'payrollService', 'joppdService', function ($scope, $state, identityService, payrollService, joppdService) {

    $scope.joppd = {};
    $scope.isNew = false;

    $scope.applicantTypes = []; 
    $scope.reportTypes = [];
    $scope.payrolls = [];

    var currentCompanyId = identityService.getIdentity().defaultCompanyId;
    var currentDate = new Date; 

    var fromDate = currentDate.substractDays(365);
    var toDate = currentDate;

    if ($state.params.id) {
        joppdService.getJoppd($state.params.id).then(function (data) { $scope.joppd = data; });
    }
    else {
        $scope.isNew = true;
        
        joppdService.getJoppdApplicantTypes().then(function (data) { $scope.applicantTypes = data; });
        joppdService.getJoppdReportTypes().then(function (data) { $scope.reportTypes = data; });
        payrollService.getPayrolls(currentCompanyId, fromDate, toDate).then(function (data) { $scope.payrolls = data; });
    }

    $scope.createJoppd = function (joppd) {

        joppd.companyId = currentCompanyId;
        joppdService.createJoppd(joppd).then(function () {
            $state.go('humanresources.joppds');
        });

    };

    $scope.delete = function (joppdId, joppdItemId) {
        joppdService.deleteJoppdItem(joppdId, joppdItemId).then(function () {
            $state.reload();
        });
    };

}]);