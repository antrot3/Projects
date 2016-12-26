'use strict';

businessInteligenceApp.controller('cumulativeSalesByBuyers', ['$scope', 'reportsService', 'identityService', 'localizationService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, reportsService, identityService, localizationService, DTOptionsBuilder, DTColumnBuilder) {

    $scope.retailWholesalePlantTypes = 3;
    $scope.buyerPartnerTypes = 1;

    var currentMonth = (new Date).getMonth() + 1;
    var currentDay = (new Date).getDate();
    $scope.dateFrom = new Date('2013-01-01');
    $scope.dateTo = new Date('2013-' + currentMonth + '-' + currentDay);

    var identity = identityService.getIdentity();
    if (identity)
        $scope.currentCompanyId = identity.defaultCompanyId;

    $scope.reportColumns = [
        DTColumnBuilder.newColumn('number').withTitle('Redni broj'),
        DTColumnBuilder.newColumn('buyerName').withTitle('Kupac'),
        DTColumnBuilder.newColumn('quantity').withTitle('Količina')
    ];

    $scope.reportFooter = '<tfoot><tr><th></th><th></th><th></th></tr></tfoot>';

    $scope.getReport = function (reportFilters) {

        var promise = reportsService.getCumulativeSalesByBuyers(reportFilters);

        promise.then(function (data) {
            $scope.reportOptions = DTOptionsBuilder.fromFnPromise(function () { return promise; })
                .withDataProp('items')
                .withPaginationType('full_numbers')
                .withDisplayLength(50)
                .withTableTools('/Content/libraries/datatables-v1.10.4/swf/copy_csv_xls_pdf.swf')
                .withTableToolsButtons(['xls'])
                .withOption('footerCallback', function () {
                    var api = this.api();
                    $(api.column(2).footer()).html(data.totals.quantity);
                });
        });

    };

}]);