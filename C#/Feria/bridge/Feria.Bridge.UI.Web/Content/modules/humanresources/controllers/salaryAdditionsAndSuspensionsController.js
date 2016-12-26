'use strict';

humanResourcesApp.controller('salaryAdditionsAndSuspensionsController', ['$scope', '$compile', '$state', 'ngDialog', 'localizationService', 'identityService', 'humanResourcesMasterDataService', 'DTOptionsBuilder', 'DTColumnBuilder',
    function ($scope, $compile, $state,ngDialog, localizationService, identityService, humanResourcesMasterDataService, DTOptionsBuilder, DTColumnBuilder) {

       
        $scope.defaultCompanyId = identityService.getIdentity().defaultCompanyId;

        $scope.salaryAdditionsColumns = [
            DTColumnBuilder.newColumn('name').withTitle(localizationService.getLabel('humanResources_salaryAdditions_name')),
            DTColumnBuilder.newColumn('taxable').withTitle(localizationService.getLabel('humanResources_salaryAdditions_taxable')).renderWith(function (data, type, full) {
                if (data == true)
                { return 'Da'; }
                else
                { return 'Ne'; }
            }),
            DTColumnBuilder.newColumn(null).withTitle(localizationService.getLabel('humanResources_actions')).notSortable().renderWith(actionsHtml)
        ];

        $scope.salaryAdditionsOptions = DTOptionsBuilder.fromFnPromise(function () { return humanResourcesMasterDataService.getSalaryAdditions($scope.defaultCompanyId); })
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow);

        function createdRow(row) {
            $compile(angular.element(row).contents())($scope);
        }
        $scope.salarySuspensionsColumns = [
            DTColumnBuilder.newColumn('name').withTitle(localizationService.getLabel('humanResources_salarySuspensions_name')),
            DTColumnBuilder.newColumn('taxable').withTitle(localizationService.getLabel('humanResources_salarySuspensions_taxable')).renderWith(function (data, type, full) {
                if (data == true)
                { return 'Da'; }
                else
                { return 'Ne'; }
            }), 
            DTColumnBuilder.newColumn(null).withTitle(localizationService.getLabel('humanResources_actions')).notSortable().renderWith(htmlActions)
        ];

        $scope.salarySuspensionsOptions = DTOptionsBuilder.fromFnPromise(function () { return humanResourcesMasterDataService.getSalarySuspensions($scope.defaultCompanyId); })
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow);

        function createdRow(row) {
            $compile(angular.element(row).contents())($scope);
        }

        $scope.editSalaryAddition = function (id, newTaxable, defaultCompanyId, selectedAcquirerTypeId, selectedFirstLastInsuranceMonthTypeId, selectedTaxFreeReceiptTypeId) {
            $scope.salaryAdditionId = id;
     
            var dialog = ngDialog.open({
                template: '/template/HumanResources/SalaryAdditionAddEditDialog',
                controller: ['$scope', '$state', 'humanResourcesMasterDataService', 'localizationService','identityService',
                            function ($scope, $state, humanResourcesMasterDataService, localizationService, identityService) {
                                $scope.salaryAddition = {};
                                
                                if (id != null) {
                                    humanResourcesMasterDataService.getSalaryAddition(id).then(function (data) {
                                        $scope.salaryAddition = data;
                                        $scope.salaryAddition.newTaxable = data.taxable;
                                        $scope.salaryAddition.selectedAcquirerTypeId = data.acquirerTypeId;
                                        $scope.salaryAddition.selectedFirstLastInsuranceMonthTypeId = data.firstLastInsuranceMonthTypeId;
                                        $scope.salaryAddition.selectedTaxFreeReceiptTypeId = data.taxFreeReceiptTypeId;

                                    });
                                }

                                $scope.saveSalaryAddition = function (salaryAddition, newTaxable, selectedAcquirerTypeId, selectedFirstLastInsuranceMonthTypeId, selectedTaxFreeReceiptTypeId) {
                                    var defaultCompanyId = identityService.getIdentity().defaultCompanyId;
                                    
                                    humanResourcesMasterDataService
                                    .saveSalaryAddition(salaryAddition, $scope.$parent.salaryAdditionId, newTaxable, defaultCompanyId, selectedAcquirerTypeId, selectedFirstLastInsuranceMonthTypeId, selectedTaxFreeReceiptTypeId)
                                    .then(function (result) {
                                        $state.reload('humanresources.salaryadditionsandsuspensions');
                                        dialog.close();

                                    });

                                };
                                $scope.closeThisDialog = function () {
                                    dialog.close();
                                };
                            }
                ],
                className: 'ngdialog-theme-default',
                closeByDocument: false,
                scope: $scope
            });
        };

        $scope.editSalarySuspension = function (id, newTaxable) {
            $scope.salarySuspensionId = id;

            var dialog = ngDialog.open({
                template: '/template/HumanResources/SalarySuspensionAddEditDialog',
                controller: ['$scope', '$state', 'humanResourcesMasterDataService', 'localizationService', 'identityService',
                            function ($scope, $state, humanResourcesMasterDataService, localizationService, identityService) {
                                $scope.salarySuspension = {};

                                if (id != null) {
                                    humanResourcesMasterDataService.getSalarySuspension(id).then(function (data) {
                                        $scope.salarySuspension = data;
                                        $scope.salarySuspension.newTaxable = data.taxable;
                                       
                                    });
                                }

                                $scope.saveSalarySuspension = function (salarySuspension, newTaxable) {
                                    var defaultCompanyId = identityService.getIdentity().defaultCompanyId;
                                    humanResourcesMasterDataService
                                    .saveSalarySuspension(salarySuspension, $scope.$parent.salarySuspensionId, newTaxable, defaultCompanyId)
                                    .then(function (result) {
                                        $state.reload('humanresources.salaryadditionsandsuspensions');
                                        dialog.close();

                                    });

                                };
                                $scope.closeThisDialog = function () {
                                    dialog.close();
                                };
                            }
                ],
                className: 'ngdialog-theme-default',
                closeByDocument: false,
                scope: $scope
            });
        };
        $scope.deactivateSalarySuspension = function (id) {
            bootbox.dialog({
                message: localizationService.getLabel('humanResources_salarySuspension_deleteDialog'),
                title: localizationService.getLabel('humanResources_salarySuspensions_deleteTitle'),
                buttons: {
                    success: {
                        label: localizationService.getLabel('humanResources_salarySuspensions_confirmDeleting'),
                        className: "btn-flat btn-success",
                        callback: function () {
                            humanResourcesMasterDataService.deactivateSalarySuspension(id).then(function () {
                                $state.reload('humanresources.salaryadditionsandsuspensions');
                            });
                        }
                    },
                    danger: {
                        label: localizationService.getLabel('humanResources_salarySuspensions_declineDeleting'),
                        className: "btn-flat btn-danger",
                        callback: function () {

                        }
                    }
                }
            });

        };
        $scope.deactivateSalaryAddition = function (id) {
            bootbox.dialog({
                message: localizationService.getLabel('humanResources_salaryAdditions_deleteDialog'),
                title: localizationService.getLabel('humanResources_salaryAdditions_deleteTitle'),
                buttons: {
                    success: {
                        label: localizationService.getLabel('humanResources_salaryAdditions_confirmDeleting'),
                        className: "btn-flat btn-success",
                        callback: function () {
                            humanResourcesMasterDataService.deactivateSalaryAddition(id).then(function () {
                                $state.reload('humanresources.salaryadditionsandsuspensions');
                            });
                        }
                    },
                    danger: {
                        label: localizationService.getLabel('humanResources_salaryAdditions_declineDeleting'),
                        className: "btn-flat btn-danger",
                        callback: function () {

                        }
                    }
                }
            });

        };
        function actionsHtml(record) {
            return '<a class="btn btn-warning" ng-click="editSalaryAddition(\'' + record.id + '\') ">' +
                        '<i class="glyphicon glyphicon-edit"></i>' +
                   '</a> ' +

                   '<button class="btn btn-danger"  ng-click="deactivateSalaryAddition(\'' + record.id + '\')">' +
                        '<span class="glyphicon glyphicon-trash"></span>' +
                   '</button>';

        }

        
        function htmlActions(record) {
            return '<a class="btn btn-warning" ng-click="editSalarySuspension(\'' + record.id + '\') ">' +
                        '<i class="glyphicon glyphicon-edit"></i>' +
                   '</a> ' +

                   '<button class="btn btn-danger"  ng-click="deactivateSalarySuspension(\'' + record.id + '\')">' +
                        '<span class="glyphicon glyphicon-trash"></span>' +
                   '</button>';

        }

      
    }]);
