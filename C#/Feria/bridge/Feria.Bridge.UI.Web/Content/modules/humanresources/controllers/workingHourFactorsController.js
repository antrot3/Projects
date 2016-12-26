'use strict';

humanResourcesApp.controller('workingHourFactorsController', ['$scope','$filter', '$compile', '$state', 'ngDialog', 'localizationService', 'settingsService', 'identityService', 'DTOptionsBuilder', 'DTColumnBuilder','DTDefaultOptions',
    function ($scope, $filter, $compile, $state, ngDialog, localizationService, settingsService, identityService, DTOptionsBuilder, DTColumnBuilder, DTDefaultOptions) {

        $scope.companyId = identityService.getIdentity().defaultCompanyId;
        $scope.Columns = [
            DTColumnBuilder.newColumn('workingHourType').withTitle(localizationService.getLabel('humanResources_settings_workingHourFactors_type')),
            DTColumnBuilder.newColumn('factor').withTitle(localizationService.getLabel('humanResources_settings_workingHourFactors_factor')),
            DTColumnBuilder.newColumn(null).withTitle(localizationService.getLabel('humanResources_settings_workingHourFactors_showOnPage')).renderWith(booleanHtml),
            DTColumnBuilder.newColumn(null).withTitle(localizationService.getLabel('humanResources_employee_actions')).notSortable().renderWith(actionsHtml)

        ];

        $scope.data = DTOptionsBuilder.fromFnPromise(function () { return settingsService.getWorkingHourFactors($scope.companyId); })
            .withPaginationType('full_numbers').withDisplayLength(20)
            .withOption('createdRow', createdRow);

        function createdRow(row) {
            $compile(angular.element(row).contents())($scope);
        }


        $scope.edit = function (workingHourFactorId) {
            var dialog = ngDialog.open({
                template: '/template/HumanResources/SettingsWorkingHourFactorAddEditDialog',
                controller: ['$scope', 'settingsService', 'localizationService', function ($scope, settingsService, localizationService) {
                    $scope.workingHourFactor = {};
                    $scope.validFlag = true;
                    $scope.disabledFlag = false;
                    if (workingHourFactorId)
                        settingsService.getWorkingHourFactor(workingHourFactorId).then(function (data) {

                        $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                        $scope.workingHourFactor = data;
                        $scope.validFlag = false;
                        $scope.backup = angular.copy($scope.workingHourFactor);
                    });
                    else
                        $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                    $scope.$watch("workingHourFactor.description", function (value) {
                        if(value != null)
                        $scope.disabledFlag = true;
                    });
                    
                    $scope.validation = [];
                    $scope.validation['factorValid'] = false;
                    $scope.validation['showOnPageValid'] = false;
                    $scope.validation['workingHourTypeValid'] = false;
                    $scope.$watch("workingHourFactor", function (value) {
                        if ($scope.workingHourFactor.factor != null)
                            $scope.validation['factorValid'] = true;
                        else
                            $scope.validation['factorValid'] = false;
                        if ($scope.workingHourFactor.showOnPage != null)
                            $scope.validation['showOnPageValid'] = true;
                        else
                            $scope.validation['showOnPageValid'] = false;
                        if ($scope.workingHourFactor.workingHourType)
                            $scope.validation['workingHourTypeValid'] = true;
                        else
                            $scope.validation['workingHourTypeValid'] = false;

                        if ($scope.validation['workingHourTypeValid'] && $scope.validation['showOnPageValid'] && $scope.validation['factorValid'])
                            $scope.validFlag = false;
                        else
                            $scope.validFlag = true;
                    }, true);

                    $scope.close = function () {
                        if ($scope.disabledFlag == true) {
                            $scope.workingHourFactor.factor = $scope.backup.factor;
                            $scope.workingHourFactor.showOnPage = $scope.backup.showOnPage;
                        }
                        dialog.close()
                    }
                    $scope.save = function (id, workingHourFactor) {
                        settingsService.saveWorkingHourFactor(id, workingHourFactor).then(function () {
                            dialog.close();
                            $state.reload();
                        });
                    }

                }],
                className: 'ngdialog-theme-default',
                closeByDocument: false,
                closeByEscape: false,
                showClose: false,
                trapFocus: true,
                preserveFocus: true,
                scope: $scope
            });
        };

        $scope.deactivate = function (id) {
        };

        function actionsHtml(record) {
            return '<button class="btn btn-warning"  ng-click="edit(\'' + record.id + '\')">' +
                        '<span class="glyphicon glyphicon-edit"></span>' +
                   '</button> ';
        }

        function booleanHtml(record) {
            return $filter('boolFilter')(record.showOnPage);
        }
    }]);