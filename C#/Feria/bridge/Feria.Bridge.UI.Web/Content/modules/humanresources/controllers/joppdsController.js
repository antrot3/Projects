'use strict';

humanResourcesApp.controller('joppdsController', ['$scope', '$filter', '$compile', 'joppdService', 'identityService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, $filter, $compile, joppdService, identityService, DTOptionsBuilder, DTColumnBuilder) {

    var currentCompanyId = identityService.getIdentity().defaultCompanyId;
    var currentDate = new Date;

    var fromDate = currentDate.substractDays(7);
    var toDate = currentDate;

    $scope.joppdsColumns = [
        DTColumnBuilder.newColumn('reportLabel').withTitle('Oznaka'),
        DTColumnBuilder.newColumn('reportType').withTitle('Vrsta'),
        DTColumnBuilder.newColumn('date').withTitle('Datum podnošenja').renderWith(function (data) {
            return $filter('dateTimeFormat')(data);
        }),
        DTColumnBuilder.newColumn(null).withTitle('Period').renderWith(function (data) {
            return data.month + ' / ' + data.year;
        }), 
        DTColumnBuilder.newColumn(null).withTitle('Vezni obračun plaće').renderWith(function (data) {
            return (data.payrollMonth && data.payrollYear ? data.payrollMonth + ' / ' + data.payrollYear : '');
        }), 
        DTColumnBuilder.newColumn(null).withTitle('Akcije').notSortable().renderWith(actionsHtml)
    ];

    $scope.joppdsOptions = DTOptionsBuilder.fromFnPromise(function () { return joppdService.getJoppds(currentCompanyId, fromDate, toDate); })
        .withPaginationType('full_numbers')
        .withOption('createdRow', createdRow);

    $scope.edit = function (id) {
    };

    $scope.delete = function (id) {
        joppdService.deleteJoppd(id).then(function () {
            $scope.joppdsOptions.reloadData();
        });
    };

    function createdRow(row) {
        $compile(angular.element(row).contents())($scope);
    }

    function actionsHtml(record) {
        return '<a class="btn btn-warning" href="/humanresources/joppd/edit/' + record.id + '">' +
                    '<i class="glyphicon glyphicon-edit"></i>' +
               '</a> ' +
               '<button class="btn btn-danger" ng-click="delete(\'' + record.id + '\')">' +
                    '<span class="glyphicon glyphicon-trash"></span>' +
               '</button>';
    }

}]);