'use strict';

humanResourcesApp.controller('salaryTaxesController', ['$scope', '$compile', '$state', 'ngDialog', 'localizationService', 'settingsService', 'identityService', 'DTOptionsBuilder', 'DTColumnBuilder',
    function ($scope, $compile, $state, ngDialog, localizationService, settingsService, identityService, DTOptionsBuilder, DTColumnBuilder) {

        $scope.salaryTaxesColumns = [
            DTColumnBuilder.newColumn('percentage').withTitle(localizationService.getLabel('humanResources_salaryTaxes_percentage')),
            DTColumnBuilder.newColumn('upperAmount').withTitle(localizationService.getLabel('humanResources_salaryTaxes_upperAmount')),
            DTColumnBuilder.newColumn(null).withTitle(localizationService.getLabel('humanResources_actions')).notSortable().renderWith(actionsHtml)
        ];

        $scope.salaryTaxesOptions = DTOptionsBuilder.fromFnPromise(function () { return settingsService.getSalaryTaxes(); })
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow);

        function createdRow(row) {
            $compile(angular.element(row).contents())($scope);
        }

    
        $scope.deactivate = function (id) {
            bootbox.dialog({
                message: localizationService.getLabel('humanResources_salaryTaxes_deleteDialog'),
                title: localizationService.getLabel('humanResources_salaryTaxes_deleteTitle'),
                buttons: {
                    success: {
                        label: localizationService.getLabel('humanResources_salaryTaxes_confirmDeleting'),
                        className: "btn-flat btn-success",
                        callback: function () {
                            settingsService.deactivateSalaryTax(id).then(function () {
                                $state.reload('humanresources.salarytax');
                            });
                        }
                    },
                    danger: {
                        label: localizationService.getLabel('humanResources_salarytaxes_declineDeleting'),
                        className: "btn-flat btn-danger",
                        callback: function () {

                        }
                    }
                }
            });

        };

        $scope.edit = function (id) {
            $scope.salaryTaxId = id;
            var dialog = ngDialog.open({
                template: '/template/HumanResources/SalaryTaxAddEditDialog',
                controller: ['$scope', '$state', 'settingsService', 'localizationService',
                            function ($scope, $state, settingsService, localizationService) {
                                $scope.salaryTax = {};
                                if (id != null) {
                                    settingsService.getSalaryTax(id).then(function (data) {
                                        $scope.salaryTax = data;
                                    });
                                }
                                $scope.saveSalaryTax = function (salaryTax) {
                                    settingsService
                                    .updateSalaryTax(salaryTax, $scope.$parent.salaryTaxId)
                                    .then(function (result) {
                                        $state.reload('humanresources.salarytax');
                                        dialog.close();
                                    });
                                };
                                $scope.closeThisDialog = function () {
                                    dialog.close();
                                };

                            }],
                className: 'ngdialog-theme-default',
                closeByDocument: false,
                scope: $scope
            });
        };

        function actionsHtml(record) {
            return '<button class="btn btn-warning"  ng-click="edit(\'' + record.id + '\') && closeThisDialog()">' +
                        '<span class="glyphicon glyphicon-edit"></span>' +
                   '</button> ' +

                   '<button class="btn btn-danger"  ng-click="deactivate(\'' + record.id + '\')">' +
                        '<span class="glyphicon glyphicon-trash"></span>' +
                   '</button>';
        }

}]);