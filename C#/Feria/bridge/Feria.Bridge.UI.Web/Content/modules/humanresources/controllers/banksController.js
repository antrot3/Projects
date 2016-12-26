'use strict';

humanResourcesApp.controller('banksController', ['$scope', '$compile', '$state', 'localizationService','humanResourcesMasterDataService', 'identityService', 'DTOptionsBuilder', 'DTColumnBuilder',
    function ($scope, $compile, $state, localizationService, humanResourcesMasterDataService, identityService, DTOptionsBuilder, DTColumnBuilder) {

        $scope.banksColumns = [
            DTColumnBuilder.newColumn('name').withTitle(localizationService.getLabel('humanResources_banks_name')),
            DTColumnBuilder.newColumn('address').withTitle(localizationService.getLabel('humanResources_banks_address')),
            DTColumnBuilder.newColumn(null).withTitle('Akcije').notSortable().renderWith(actionsHtml)
        ];

        $scope.banksOptions = DTOptionsBuilder.fromFnPromise(function () { return humanResourcesMasterDataService.getBanks(); })
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow); 

        function createdRow(row) {
            $compile(angular.element(row).contents())($scope);
        }

        $scope.deactivate = function (id) {
            bootbox.dialog({
                message: localizationService.getLabel('humanResources_banks_deleteDialog'),
                title: localizationService.getLabel('humanResources_banks_deleteTitle'),
                buttons: {
                    success: {
                        label: localizationService.getLabel('humanResources_banks_confirmDeleting'),
                        className: "btn-flat btn-success",
                        callback: function () {
                            humanResourcesMasterDataService.deactivateBank(id).then(function() {
                                $state.reload('humanresources.banks');
                            });
                        }
                    },
                    danger: {
                        label: localizationService.getLabel('humanResources_bank_declineDeleting'),
                        className: "btn-flat btn-danger",
                        callback: function () {

                        }
                    }
                }
            });

        };
          
    function actionsHtml(record) {
        return '<a class="btn btn-warning" href="/humanresources/bank/edit/' + record.id + '">' +
                    '<i class="glyphicon glyphicon-edit"></i>' +
               '</a> ' +
            
               '<button class="btn btn-danger"  ng-click="deactivate(\'' + record.id + '\')">' +
                    '<span class="glyphicon glyphicon-trash"></span>' +
               '</button>';
    
    }
}]);