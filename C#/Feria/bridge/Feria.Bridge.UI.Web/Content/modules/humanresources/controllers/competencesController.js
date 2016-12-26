'use strict';

humanResourcesApp.controller('competencesController', ['$scope', '$state', '$compile','localizationService', 'humanResourcesMasterDataService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope,$state, $compile,localizationService, humanResourcesMasterDataService, DTOptionsBuilder, DTColumnBuilder) {

    $scope.competencesColumns = [
        DTColumnBuilder.newColumn('name').withTitle(localizationService.getLabel('humanResources_masterData_competences_name')),
        DTColumnBuilder.newColumn('description').withTitle(localizationService.getLabel('humanResources_masterData_competences_description')),
        DTColumnBuilder.newColumn('certification').withTitle(localizationService.getLabel('humanResources_masterData_competences_certification')),
        DTColumnBuilder.newColumn('institution').withTitle(localizationService.getLabel('humanResources_masterData_competences_institution')),
        DTColumnBuilder.newColumn('institutionAddress').withTitle(localizationService.getLabel('humanResources_masterData_competences_institutionAddress')),
        DTColumnBuilder.newColumn(null).withTitle(localizationService.getLabel('actionBar_actions')).notSortable().renderWith(actionsHtml)
    ];
    
    $scope.competencesOptions = DTOptionsBuilder.fromFnPromise(function () { return humanResourcesMasterDataService.getCompetences(); })
        .withPaginationType('full_numbers').withOption('createdRow', createdRow);

    function createdRow(row) {
        $compile(angular.element(row).contents())($scope);
    }
    $scope.delete = function (id) {
        bootbox.dialog({
            message: localizationService.getLabel('humanResources_masterData_competences_deleteDialog'),
            title: localizationService.getLabel('humanResources_masterData_competences_deleteTitle'),
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_masterData_competences_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        humanResourcesMasterDataService.deleteCompetence(id).then(function () {
                            $state.reload('humanresources.competences');
                        });
                    }
                },
                danger: {
                    label: localizationService.getLabel('humanResources_masterData_competences_declineDeleting'),
                    className: "btn-flat btn-danger",
                    callback: function () {

                    }
                }
            }
        });
            
    };

    function actionsHtml(record) {
        return '<a class="btn btn-warning" href="/humanresources/competence/edit/' + record.id + '">' +
                    '<i class="glyphicon glyphicon-edit"></i>' +
               '</a> ' +
               '<button class="btn btn-danger" ng-click="delete(\'' + record.id + '\')" id = "deleteCompetence">' +
                    '<span class="glyphicon glyphicon-trash"></span>' +
               '</button>';
    }
}]);