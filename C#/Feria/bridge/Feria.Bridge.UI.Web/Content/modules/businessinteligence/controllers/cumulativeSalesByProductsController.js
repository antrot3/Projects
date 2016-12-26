'use strict';

businessInteligenceApp.controller('cumulativeSalesByProductsController', ['$scope', 'reportsService', 'identityService', 'localizationService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, reportsService, identityService, localizationService, DTOptionsBuilder, DTColumnBuilder) {

    $scope.retailWholesalePlantTypes = 3;

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
        DTColumnBuilder.newColumn('number').withTitle(localizationService.getLabel('businessInteligence_cumulativeSalesByProducts_number')), 
        DTColumnBuilder.newColumn('productCode').withTitle(localizationService.getLabel('businessInteligence_cumulativeSalesByProducts_productCode')), 
        DTColumnBuilder.newColumn('productName').withTitle(localizationService.getLabel('businessInteligence_cumulativeSalesByProducts_productName')), 
        DTColumnBuilder.newColumn('productClassification').withTitle(localizationService.getLabel('businessInteligence_cumulativeSalesByProducts_productClassification')), 
        DTColumnBuilder.newColumn('quantity').withTitle(localizationService.getLabel('businessInteligence_cumulativeSalesByProducts_quantity'))
    ];

    $scope.reportFooter = '<tfoot><tr><th></th><th></th><th></th><th></th><th></th></tr></tfoot>';

    $scope.getReport = function (reportFilters) {

        var promise = reportsService.getCumulativeSalesByProducts(reportFilters);

        promise.then(function (data) {
            $scope.reportOptions = DTOptionsBuilder.fromFnPromise(function () { return promise; })
                .withDataProp('items')
                .withPaginationType('full_numbers')
                .withDisplayLength(50)
                .withTableTools('/Content/libraries/datatables-v1.10.4/swf/copy_csv_xls_pdf.swf')
                .withTableToolsButtons(['xls'])
                .withOption('footerCallback', function () {
                    var api = this.api();
                    $(api.column(4).footer()).html(data.totals.quantity);
                });
        });

    };

}]);