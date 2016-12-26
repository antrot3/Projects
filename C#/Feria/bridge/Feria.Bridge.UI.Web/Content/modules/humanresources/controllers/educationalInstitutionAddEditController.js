'use strict';

humanResourcesApp.controller('educationalInstitutionAddEditController', ['$scope','$compile', '$state','ngDialog', 'localizationService', 'humanResourcesMasterDataService', 'identityService', 'DTColumnBuilder', 'DTOptionsBuilder',
    function ($scope, $compile, $state, ngDialog, localizationService, humanResourcesMasterDataService, identityService, DTColumnBuilder, DTOptionsBuilder) {

        $scope.educationalInstitution = {};
        $scope.educationalRank = {};
        $scope.edit = true;
        $scope.action = $state.current.data.action;

        $scope.resetEducationalInstitution= function()
        {
            $state.go('humanresources.educationalinstitutions');
        }
        
        if ($state.params.id) {
            humanResourcesMasterDataService.getEducationalInstitution($state.params.id).then(function (data) {
                $scope.educationalInstitution = data;
            });
        }
       

        $scope.saveEducationalInstitution = function (educationalInstitution, isValid) {
            if (isValid) {
                humanResourcesMasterDataService
                  .updateEducationalInstitution(educationalInstitution)
                      .then(function (result) {
                          $state.go('humanresources.educationalinstitutions');
                          $scope.edit = false;
                      });
            };
        }
        

        $scope.educationalRanksColumns = [
            DTColumnBuilder.newColumn('name').withTitle(localizationService.getLabel('humanResources_educationalRanks_name')),
            DTColumnBuilder.newColumn('categoryName').withTitle(localizationService.getLabel('humanResources_educationalRanks_category')),
            DTColumnBuilder.newColumn(null).withTitle(localizationService.getLabel('actionBar_actions')).notSortable().renderWith(actionsHtml)
        ];

        $scope.educationalRanksOptions = DTOptionsBuilder.fromFnPromise(function () {
            return humanResourcesMasterDataService.getEducationalRanks($state.params.id);
        })
       .withPaginationType('full_numbers')
       .withOption('createdRow', createdRow);

        function createdRow(row) {
            $compile(angular.element(row).contents())($scope);
        }

        
        $scope.editRank = function (id) {
            $scope.educationalRankId = id;
            var dialog = ngDialog.open({                
                template: '/template/HumanResources/EducationalRankDialog',
                controller: ['$scope', '$state', 'humanResourcesMasterDataService', 'localizationService',
                            function ($scope, $state, humanResourcesMasterDataService, localizationService) {
                                $scope.educationalRank = {};
                                if (id != null) {
                                    humanResourcesMasterDataService.getEducationalRank(id).then(function (data) {
                                        $scope.educationalRank = data;
                                        $scope.educationalRank.category = data.categoryName;
                                    });
                                }
                                $scope.saveRank = function (educationalRank) {                                  
                                    humanResourcesMasterDataService
                                        .saveEducationalRank(educationalRank, $state.params.id)
                                        .then(function (result) {
                                            $state.reload('humanresources.educationalinstitutionedit');
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
                message: localizationService.getLabel('humanResources_educationalRanks_deleteDialog'),
                title: localizationService.getLabel('humanResources_educationalRanks_deleteTitle'),
                buttons: {
                    success: {
                        label: localizationService.getLabel('humanResources_educationalRanks_confirmDeleting'),
                        className: "btn-flat btn-success",
                        callback: function () {
                                humanResourcesMasterDataService.deactivateEducationalRank(id).then(function () {
                                    $state.reload('humanresources.educationalinstitutionedit');
                            });
                        }
                    },
                    danger: {
                        label: localizationService.getLabel('humanResources_educationalRanks_declineDeleting'),
                        className: "btn-flat btn-danger",
                        callback: function () {

                        }
                    }
                }
            });
        }
        

        function actionsHtml(record) {
            return '<button class="btn btn-warning" ng-click="editRank(\'' + record.id + '\') ">' +
                        '<span class="glyphicon glyphicon-edit"></span>' +
                   '</button> ' +

                   '<button class="btn btn-danger"  ng-click="deactivate(\'' + record.id + '\')">' +
                        '<span class="glyphicon glyphicon-trash"></span>' +
                   '</button>';
        }

}]);