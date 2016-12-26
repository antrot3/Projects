'use strict';

humanResourcesApp.controller('employeesController', ['$scope', '$state','$compile', '$window', 'humanResourcesEmployeeService', 'identityService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope,$state, $compile, $window, humanResourcesEmployeeService, identityService, DTOptionsBuilder, DTColumnBuilder) {

    var currentCompanyId = identityService.getIdentity().defaultCompanyId;

    $scope.employeesColumns = [
        DTColumnBuilder.newColumn('firstName').withTitle('Ime'),
        DTColumnBuilder.newColumn('lastName').withTitle('Prezime'),
        DTColumnBuilder.newColumn('personalMandatoryIdentificationNumber').withTitle('OIB'),
        DTColumnBuilder.newColumn('email').withTitle('Email'),
        DTColumnBuilder.newColumn(null).withTitle('Akcije').notSortable().renderWith(actionsHtml)
    ];

    $scope.employeesOptions = DTOptionsBuilder.fromFnPromise(function () { return humanResourcesEmployeeService.getEmployees(currentCompanyId); })
        .withPaginationType('full_numbers')
        .withOption('createdRow', createdRow).withOption('fnRowCallback', function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td:lt(4)', nRow).bind('click', function () {
                $state.go('humanresources.employeeview', { id: aData.id });
            });
            return nRow;
        });

    $scope.delete = function(id) {
    };

    function createdRow(row) {
        $compile(angular.element(row).contents())($scope); 
    }
        
    $scope.print = function (id) {
        var fileURL = '';
        humanResourcesEmployeeService.getEmployeeCardPdf(id)
            .then(function (result) {
                var file = new Blob([result], { type: 'application/pdf' });
                var fileURL = $window.URL.createObjectURL(file);               

                // open document in new window
                $window.open(fileURL);               
            });
       
    };

    function actionsHtml(record) {
        return '<a class="btn btn-warning" href="/humanresources/employee/edit/' + record.id + '">' +
                    '<i class="glyphicon glyphicon-edit"></i>' +
               '</a> ' +
               '<button class="btn btn-danger" ng-click="delete(\'' + record.id + '\')">' +
                    '<span class="glyphicon glyphicon-trash"></span>' +
               '</button> ' +
              '<button class="btn btn-info" " target="_blank" ng-click="print(\'' + record.id + '\')">' +
                   '<span class="glyphicon glyphicon-print"></span>' +
              '</button>';
    }

}]);