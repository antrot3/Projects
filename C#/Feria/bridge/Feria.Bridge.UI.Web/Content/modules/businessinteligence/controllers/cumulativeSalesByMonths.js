'use strict';

businessInteligenceApp.controller('cumulativeSalesByMonths', ['$scope', 'reportsService', 'identityService', 'localizationService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, reportsService, identityService, localizationService, DTOptionsBuilder, DTColumnBuilder) {

    $scope.retailWholesalePlantTypes = 3;
    $scope.buyerPartnerTypes = 1;

    var currentMonth = (new Date).getMonth() + 1;
    var currentDay = (new Date).getDate();
    $scope.dateFrom = new Date('2013-01-01');
    $scope.dateTo = new Date('2013-' + currentMonth + '-' + currentDay);

    var identity = identityService.getIdentity();
    if (identity)
        $scope.currentCompanyId = identity.defaultCompanyId;

    $scope.getReport = function (reportFilters) {

        var promise = reportsService.getCumulativeSalesByMonths(reportFilters);

        promise.then(function (data) {

            $scope.reportFooter = '<tfoot><tr><th></th><th></th><th></th>';
            $scope.reportColumns = [
                DTColumnBuilder.newColumn('number').withTitle('Redni broj'),
                DTColumnBuilder.newColumn('productCode').withTitle('Šifra'),
                DTColumnBuilder.newColumn('productName').withTitle('Naziv')
            ];

            data.monthRange.forEach(function (entry) {
                $scope.reportFooter += '<th></th>';
                $scope.reportColumns.push(DTColumnBuilder.newColumn('quantities.' + entry).withTitle(entry));
            });

            $scope.reportFooter += '<th></th></tr></tfoot>';
            $scope.reportColumns.push(DTColumnBuilder.newColumn('totalQuantity').withTitle('Total'));

            $scope.reportOptions = DTOptionsBuilder.fromFnPromise(function () { return promise; })
                .withDataProp('items')
                .withPaginationType('full_numbers')
                .withDisplayLength(50)
                .withTableTools('/Content/libraries/datatables-v1.10.4/swf/copy_csv_xls_pdf.swf')
                .withTableToolsButtons(['xls'])
                .withOption('footerCallback', function () {
                    var api = this.api();
                    $(api.column(3 + data.monthRange.length).footer()).html(data.totals.totalQuantity);

                    data.monthRange.forEach(function (entry, i) {
                        $(api.column(3 + i).footer()).html(data.totals[entry]);
                    });
                });
        });

    };

}]);