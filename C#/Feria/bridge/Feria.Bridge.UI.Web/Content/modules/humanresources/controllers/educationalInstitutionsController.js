'use strict';

humanResourcesApp.controller('educationalInstitutionsController', ['$scope','$compile', '$state', 'localizationService', 'humanResourcesMasterDataService', 'identityService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, $compile, $state, localizationService, humanResourcesMasterDataService, identityService, DTOptionsBuilder, DTColumnBuilder) {
   
    $scope.educationalinstitutionsColumns = [
        DTColumnBuilder.newColumn('name').withTitle(localizationService.getLabel('humanResources_educationalInstitutions_name')),
        DTColumnBuilder.newColumn('address').withTitle(localizationService.getLabel('humanResources_educationalInstitutions_address')),
        DTColumnBuilder.newColumn(null).withTitle(localizationService.getLabel('actionBar_actions')).notSortable().renderWith(actionsHtml)
    ];

    

    $scope.educationalinstitutionsOptions = DTOptionsBuilder.fromFnPromise(function () {
        return humanResourcesMasterDataService.getEducationalInstitutions();
    })
    .withPaginationType('full_numbers')
    .withOption('createdRow', createdRow);

   
    function createdRow(row) {
        $compile(angular.element(row).contents())($scope);
    }

    $scope.deactivate = function (id) {
        bootbox.dialog({
            message: localizationService.getLabel('humanResources_educationalInstitutions_deleteDialog'),
            title: localizationService.getLabel('humanResources_educationalInstitutions_deleteTitle'),
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_educationalInstitutions_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        humanResourcesMasterDataService.deactivateEducationalInstitution(id).then(function () {
                            $state.reload('humanresources.educationalinstitutions');
                        });
                    }
                },
                danger: {
                    label: localizationService.getLabel('humanResources_educationalInstitutions_declineDeleting'),
                    className: "btn-flat btn-danger",
                    callback: function () {

                    }
                }
            }
        });

    };

    function actionsHtml(record) {
        return '<a class="btn btn-warning" href="/humanresources/educationalinstitution/edit/' + record.id + '">' +
                    '<i class="glyphicon glyphicon-edit"></i>' +
               '</a> ' +
               '<button class="btn btn-danger" ng-click="deactivate(\'' + record.id + '\')">' +
                    '<span class="glyphicon glyphicon-trash"></span>' +
               '</button>';
    }

}]);