'use strict';

humanResourcesApp.controller('feesFromSalaryController', ['$scope', '$compile', '$state', 'ngDialog','localizationService', 'settingsService', 'identityService', 'DTOptionsBuilder', 'DTColumnBuilder',
    function ($scope, $compile, $state, ngDialog, localizationService, settingsService, identityService, DTOptionsBuilder, DTColumnBuilder) {

       
        $scope.feesFromSalaryColumns = [
            DTColumnBuilder.newColumn('name').withTitle(localizationService.getLabel('humanResources_fees_name')),
            DTColumnBuilder.newColumn('percentage').withTitle(localizationService.getLabel('humanResources_fees_percentage')),
            DTColumnBuilder.newColumn(null).withTitle('Akcije').notSortable().renderWith(actionsHtml)
            
        ];

        $scope.feesFromSalaryOptions = DTOptionsBuilder.fromFnPromise(function () { return settingsService.getFeesFromSalary(); })
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow);

        function createdRow(row) {
            $compile(angular.element(row).contents())($scope);
        }

        $scope.edit = function (id) {
            $scope.feeFromSalaryId = id;
           var dialog = ngDialog.open({
                template: '/template/HumanResources/FeeFromSalaryDialog',
                controller: ['$scope', '$state', 'settingsService', 'localizationService',
                            function ($scope, $state, settingsService, localizationService) {
                                $scope.feeFromSalary = {};

                                settingsService.getFeeFromSalary(id).then(function (data) {
                                    $scope.feeFromSalary = data;
                                });

                                $scope.saveFeeFromSalary = function (feeFromSalary) {
                                    settingsService
                                    .updateFeeFromSalary(feeFromSalary, $scope.$parent.feeFromSalaryId)
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
                            settingsService.deactivateFeeFromSalary(id).then(function () {
                                $state.reload('settings.feesFromSalary');
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
        }
        function actionsHtml(record) {
            return '<button class="btn btn-warning" ng-click="edit(\'' + record.id + '\') ">' +
                        '<span class="glyphicon glyphicon-edit"></span>' +
                   '</button> ' +

                   '<button class="btn btn-danger"  ng-click="deactivate(\'' + record.id + '\')">' +
                        '<span class="glyphicon glyphicon-trash"></span>' +
                   '</button>';
        }
 }]);