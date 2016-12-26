'use strict';

humanResourcesApp.controller('countiesAndTownsController', ['$scope', '$compile', '$state', 'ngDialog', 'localizationService', 'humanResourcesMasterDataService', 'identityService', 'DTOptionsBuilder', 'DTColumnBuilder',
    function ($scope,$compile, $state,ngDialog, localizationService, humanResourcesMasterDataService, identityService, DTOptionsBuilder, DTColumnBuilder) {

        $scope.countryId = 'fb004a45-caf5-4e52-9e80-006118580744';

        $scope.countiesColumns = [
            
		    DTColumnBuilder.newColumn('code').withTitle(localizationService.getLabel('humanResources_counties_countyCode')),
            DTColumnBuilder.newColumn('name').withTitle(localizationService.getLabel('humanResources_counties_countyName')),
			DTColumnBuilder.newColumn('taxPercentage').withTitle(localizationService.getLabel('humanResources_counties_countyTaxPercentage')),
            DTColumnBuilder.newColumn(null).withTitle('Akcije').notSortable().renderWith(actionsHtml)
        ];


        $scope.countiesOptions = DTOptionsBuilder.fromFnPromise(function () { return humanResourcesMasterDataService.getCounties(); })
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow)
            .withOption('fnRowCallback', function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                
                $('td', nRow).unbind('click');
                $('td:lt(3)', nRow).bind('click', function () {
                var countiesTable = $('#countiesTable table').DataTable();
                var townsTable = $('#townsTable table').DataTable();
                
                
                countiesTable.on('click', 'tbody tr', function () {
                    
                    var county = countiesTable.row(this).data();
                    
                    
                        humanResourcesMasterDataService.getTownsFromCounties(county.id).then(function (data) {
                            
                            $scope.townsFromCounties = data;
                            townsTable.clear();
                            townsTable.rows.add(data);

                            townsTable.draw();
                        });
                    
                });
            });
            return nRow;
        });

        function createdRow(row) {
            $compile(angular.element(row).contents())($scope);
        }

        $scope.townsColumns = [
		    DTColumnBuilder.newColumn('zipCode').withTitle(localizationService.getLabel('humanResources_towns_townZipCode')),
            DTColumnBuilder.newColumn('name').withTitle(localizationService.getLabel('humanResources_towns_townName')),
            DTColumnBuilder.newColumn(null).withTitle('Akcije').notSortable().renderWith(htmlActions)
        ];


        $scope.townsOptions = DTOptionsBuilder.fromFnPromise(function () { return humanResourcesMasterDataService.getTowns(); })
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow);



            $scope.editCounty = function (id) {
                $scope.countyId = id;
                
                var dialog = ngDialog.open({
                    template: '/template/HumanResources/CountiesAddEditDialog',
                    controller: ['$scope', '$state', 'humanResourcesMasterDataService', 'localizationService',
                                function ($scope, $state, humanResourcesMasterDataService, localizationService) {
                                    $scope.county = {};
                                    if (id!=null){
                                        humanResourcesMasterDataService.getCounty(id).then(function (data) {
                                            $scope.county = data;
                                        });
                                    }
                                    $scope.saveCounty = function (county) {
                                        
                                        
                                        humanResourcesMasterDataService
                                        .updateCounty(county, $scope.$parent.countyId)
                                        .then(function (result) {
                                            $state.reload('humanresources.countiesandtowns');
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
        
        $scope.deactivateCounty = function (id) {
            bootbox.dialog({
                message: localizationService.getLabel('humanResources_counties_deleteDialog'),
                title: localizationService.getLabel('humanResources_counties_deleteTitle'),
                buttons: {
                    success: {
                        label: localizationService.getLabel('humanResources_counties_confirmDeleting'),
                        className: "btn-flat btn-success",
                        callback: function () {
                            humanResourcesMasterDataService.deactivateCounty(id).then(function () {
                                $state.reload('humanresources.countiesandtowns');
                            });
                        }
                    },
                    danger: {
                        label: localizationService.getLabel('humanResources_counties_declineDeleting'),
                        className: "btn-flat btn-danger",
                        callback: function () {

                        }
                    }
                }
            });
        };
        $scope.editTown = function (id, selectedCountyId) {
            $scope.townId = id;

            var dialog = ngDialog.open({
                template: '/template/HumanResources/TownsAddEditDialog',
                controller: ['$scope', '$state', 'humanResourcesMasterDataService', 'localizationService',
                            function ($scope, $state, humanResourcesMasterDataService, localizationService) {
                                $scope.town = {};

                                if (id != null) {
                                    humanResourcesMasterDataService.getTown(id).then(function (data) {
                                        $scope.town = data;
                                        $scope.town.selectedCountyId = data.countyId;
                                    });
                                }


                                $scope.saveTown = function (town, selectedCountyId) {

                                    humanResourcesMasterDataService
                                    .updateTown(town, $scope.$parent.townId, selectedCountyId)
                                    .then(function (result) {
                                        $state.reload('humanresources.countiesandtowns');
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

        $scope.deactivateTown = function (id) {
            bootbox.dialog({
                message: localizationService.getLabel('humanResources_towns_deleteDialog'),
                title: localizationService.getLabel('humanResources_towns_deleteTitle'),
                buttons: {
                    success: {
                        label: localizationService.getLabel('humanResources_towns_confirmDeleting'),
                        className: "btn-flat btn-success",
                        callback: function () {
                            humanResourcesMasterDataService.deactivateTown(id).then(function () {
                                $state.reload('humanresources.countiesandtowns');
                            });
                        }
                    },
                    danger: {
                        label: localizationService.getLabel('humanResources_towns_declineDeleting'),
                        className: "btn-flat btn-danger",
                        callback: function () {

                        }
                    }
                }
            });
        };
        function actionsHtml(record) {
            return '<button class="btn btn-warning" ng-click="editCounty(\'' + record.id + '\') ">' +
                        '<span class="glyphicon glyphicon-edit"></span>' +
                   '</button> ' +

                   '<button class="btn btn-danger"  ng-click="deactivateCounty(\'' + record.id + '\')">' +
                        '<span class="glyphicon glyphicon-trash"></span>' +
                   '</button>';
        }

        function htmlActions(record) {
            return '<button class="btn btn-warning" ng-click="editTown(\'' + record.id + '\') ">' +
                        '<span class="glyphicon glyphicon-edit"></span>' +
                   '</button> ' +

                   '<button class="btn btn-danger"  ng-click="deactivateTown(\'' + record.id + '\')">' +
                        '<span class="glyphicon glyphicon-trash"></span>' +
                   '</button>';
        }
      

}]);


