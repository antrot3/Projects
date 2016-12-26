'use strict';

businessInteligenceApp.controller('cumulativeSalesByPlants', ['$scope', 'reportsService', 'identityService', 'localizationService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, reportsService, identityService, localizationService, DTOptionsBuilder, DTColumnBuilder) {

    var currentMonth = (new Date).getMonth() + 1;
    var currentDay = (new Date).getDate();
    $scope.dateFrom = new Date('2013-01-01');
    $scope.dateTo = new Date('2013-' + currentMonth + '-' + currentDay);

    $scope.includeRetail = true;
    $scope.includeWholesale = true;

    var identity = identityService.getIdentity();
    if (identity)
        $scope.currentCompanyId = identity.defaultCompanyId;

    $scope.reportColumns = [
        DTColumnBuilder.newColumn('number').withTitle('Redni broj'),
        DTColumnBuilder.newColumn('plantCode').withTitle('Šifra'),
        DTColumnBuilder.newColumn('plantName').withTitle('Naziv'),
        DTColumnBuilder.newColumn('quantity').withTitle('Količina')
    ];

    $scope.reportFooter = '<tfoot><tr><th></th><th></th><th></th><th></th></tr></tfoot>';

    $scope.getReport = function (reportFilters) {

        var promise = reportsService.getCumulativeSalesByPlants(reportFilters);

        promise.then(function (data) {
            $scope.reportOptions = DTOptionsBuilder.fromFnPromise(function () { return promise; })
                .withDataProp('items')
                .withPaginationType('full_numbers')
                .withDisplayLength(50)
                .withTableTools('/Content/libraries/datatables-v1.10.4/swf/copy_csv_xls_pdf.swf')
                .withTableToolsButtons(['xls'])
                .withOption('footerCallback', function () {
                    var api = this.api();
                    $(api.column(3).footer()).html(data.totals.quantity);
                });
        });

    };

}]);