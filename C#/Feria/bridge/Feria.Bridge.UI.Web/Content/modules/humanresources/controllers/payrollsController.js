'use strict';
humanResourcesApp.controller('payrollsController', ['$scope', '$filter', '$compile','$window', 'payrollService', 'identityService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, $filter, $compile, $window, payrollService, identityService, DTOptionsBuilder, DTColumnBuilder) {

<<<<<<< HEAD
=======
humanResourcesApp.controller('payrollsController', ['$scope', '$filter', '$compile', 'payrollService', 'identityService', 'DTOptionsBuilder', 'DTColumnBuilder', 'ngDialog', function ($scope, $filter, $compile, payrollService, identityService, DTOptionsBuilder, DTColumnBuilder, ngDialog) {
>>>>>>> 0bc7e863922c0fb095f63949b000cce0ab40831b

    var currentCompanyId = identityService.getIdentity().defaultCompanyId;
    $scope.filter = {}
    $scope.filter.fromDate = moment().subtract(365, 'day').format('YYYY-MM-DD');
    $scope.filter.toDate = moment().format('YYYY-MM-DD');

    $scope.fromDate = moment().subtract(365, 'day').format('DD.MM.YYYY');
    $scope.toDate = moment().format('DD.MM.YYYY');

    $scope.payrollsColumns = [
        DTColumnBuilder.newColumn('month').withTitle('Mjesec'),
        DTColumnBuilder.newColumn('year').withTitle('Godina'),
        DTColumnBuilder.newColumn('taxFreeAmount').withTitle('Neoporezivi iznos'),
        DTColumnBuilder.newColumn('hours').withTitle('Fond radnih sati'),
        DTColumnBuilder.newColumn('date').withTitle('Datum obračuna').renderWith(function (data) {
            return $filter('dateTimeFormat')(data); 
        }),
        DTColumnBuilder.newColumn(null).withTitle('Akcije').notSortable().renderWith(actionsHtml)
    ];

    $scope.payrollsOptions = DTOptionsBuilder.fromFnPromise(function () { return payrollService.getPayrolls(currentCompanyId, $scope.filter.fromDate, $scope.filter.toDate); })
        .withPaginationType('full_numbers')
        .withOption('createdRow', createdRow);
<<<<<<< HEAD

    

=======
>>>>>>> 0bc7e863922c0fb095f63949b000cce0ab40831b
    $scope.edit = function (id) {
    };

    $scope.reload = function () {
        $scope.payrollsOptions = DTOptionsBuilder.fromFnPromise(function () { return payrollService.getPayrolls(currentCompanyId, $scope.filter.fromDate, $scope.filter.toDate); })
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow);
    }
    $scope.newPayroll = function () {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/PayrollAddNewDialog',
            controller: ['$scope', '$state', 'identityService', 'payrollService', 'humanResourcesMasterDataService', function ($scope, $state, identityService, payrollService, humanResourcesMasterDataService)     {
                $scope.payroll = {};
                $scope.payroll.month = moment().get('month') + 1;
                $scope.payroll.year = moment().get('year');
                $scope.validation = [];
                $scope.validation['payrollMonth'] = false;
                $scope.validation['payrollYear'] = false;
                $scope.validation['payrollTaxFreeAmount'] = false;
                $scope.validation['payrollHours'] = false;
                $scope.$watch("payroll", function (value) {
                    if ($scope.payroll.month != null)
                        $scope.validation['payrollMonth'] = true;
                    else
                        $scope.validation['payrollMonth'] = false;
                    if ($scope.payroll.year != null)
                        $scope.validation['payrollYear'] = true;
                    else
                        $scope.validation['payrollYear'] = false;
                    if ($scope.payroll.taxfreeamount != null)
                        $scope.validation['payrollTaxFreeAmount'] = true;
                    else
                        $scope.validation['payrollTaxFreeAmount'] = false;
                    if ($scope.payroll.hours != null)
                        $scope.validation['payrollHours'] = true;
                    else
                        $scope.validation['payrollHours'] = false;


                    if ($scope.validation['payrollMonth'] && $scope.validation['payrollHours'] && $scope.validation['payrollTaxFreeAmount'] && $scope.validation['payrollYear'])
                        $scope.validFlag = false;
                    else
                        $scope.validFlag = true;
                }, true);

                $scope.close = function () {
                   
                    dialog.close()
                }
                $scope.save = function (payroll) {
                        payroll.companyId = identityService.getIdentity().defaultCompanyId;
                        payrollService.createPayroll(payroll).then(function () {
                            dialog.close();
                            $state.reload();
                        });
                }

            }],
            className: 'ngdialog-theme-default',
            closeByDocument: false,
            closeByEscape: false,
            showClose: false,
            trapFocus: true,
            preserveFocus: true,
            scope: $scope
        });
    };

    $scope.delete = function (id) {
        payrollService.deletePayroll(id).then(function() {
            $scope.payrollsOptions.reloadData();
        }); 
    };
    $scope.print = function (id) {
        var fileURL = '';
        payrollService.getPayrollCardPdf(id)
            .then(function (result) {
                var file = new Blob([result], { type: 'application/pdf' });
                var fileURL = $window.URL.createObjectURL(file);

                // open document in new window
                $window.open(fileURL);
            });

    };
    function createdRow(row) {
        $compile(angular.element(row).contents())($scope);
    }
   

    function actionsHtml(record) {
        return '<a class="btn btn-warning" href="/humanresources/payroll/edit/' + record.id + '">' +
                    '<i class="glyphicon glyphicon-edit"></i>' +
               '</a> ' +
               '<button class="btn btn-danger" ng-click="delete(\'' + record.id + '\')">' +
                    '<span class="glyphicon glyphicon-trash"></span>' +
               '</button>'+
        '<button class="btn btn-info" " target="_blank" ng-click="print(\'' + record.id + '\')">' +
                   '<span class="glyphicon glyphicon-print"></span>' +
              '</button>';
    }

}]);