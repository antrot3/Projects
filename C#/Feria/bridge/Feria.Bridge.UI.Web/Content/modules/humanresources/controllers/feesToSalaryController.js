'use strict';

humanResourcesApp.controller('feesToSalaryController', ['$scope', '$compile', '$state', 'ngDialog', 'localizationService', 'settingsService', 'identityService', 'DTOptionsBuilder', 'DTColumnBuilder',
    function ($scope, $compile, $state, ngDialog, localizationService, settingsService, identityService, DTOptionsBuilder, DTColumnBuilder) {

        

        $scope.feesToSalaryColumns = [
            DTColumnBuilder.newColumn('name').withTitle(localizationService.getLabel('humanResources_fees_name')),
            DTColumnBuilder.newColumn('percentage').withTitle(localizationService.getLabel('humanResources_fees_percentage')),
            DTColumnBuilder.newColumn(null).withTitle('Akcije').notSortable().renderWith(actionsHtml)

        ];

        $scope.feesToSalaryOptions = DTOptionsBuilder.fromFnPromise(function () { return settingsService.getFeesToSalary(); })
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow); 

        function createdRow(row) {
            $compile(angular.element(row).contents())($scope);
        }


        $scope.edit = function (id) {
            $scope.feeToSalaryId = id;
            var dialog = ngDialog.open({
                template: '/template/HumanResources/FeeToSalaryDialog',
                controller: ['$scope', '$state', 'settingsService', 'localizationService',
                            function ($scope, $state, settingsService, localizationService) {
                                $scope.feeToSalary = {};

                                settingsService.getFeeToSalary(id).then(function (data) {
                                    $scope.feeToSalary = data;
                                });

                                $scope.saveFeeToSalary = function (feeToSalary) {
                                    settingsService
                                    .updateFeeToSalary(feeToSalary, $scope.$parent.feeToSalaryId)
                                    .then(function (result) {
                                        $state.reload('humanresources.fees');
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

        $scope.deactivate = function (id) {
            bootbox.dialog({
                message: localizationService.getLabel('humanResources_fees_deleteDialog'),
                title: localizationService.getLabel('humanResources_fees_deleteTitle'),
                buttons: {
                    success: {
                        label: localizationService.getLabel('humanResources_fees_confirmDeleting'),
                        className: "btn-flat btn-success",
                        callback: function () {
                            settingsService.deactivateFeeToSalary(id).then(function () {
                                $state.reload('settings.feesToSalary');
                            });
                        }
                    },
                    danger: {
                        label: localizationService.getLabel('humanResources_fees_declineDeleting'),
                        className: "btn-flat btn-danger",
                        callback: function () {

                        }
                    }
                }
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