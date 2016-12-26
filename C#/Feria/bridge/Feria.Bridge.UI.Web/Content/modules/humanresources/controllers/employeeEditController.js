'use strict';
humanResourcesApp.controller('employeeEditController', ['$scope', 'ngDialog', '$state', 'humanResourcesMasterDataService', 'humanResourcesEmployeeService', 'localizationService', 'identityService',
    function ($scope, ngDialog, $state, humanResourcesMasterDataService, humanResourcesEmployeeService, localizationService,identityService) {

        $scope.employee = {};
        $scope.defaultCompanyId = identityService.getIdentity().defaultCompanyId;
    humanResourcesMasterDataService.getTowns().then(function (data) {
        $scope.towns = data;
    });
    humanResourcesMasterDataService.getBanks().then(function (data) {
        $scope.banks = data;
    });
    $scope.noEndDate = localizationService.getLabel('humanResources_employee_noEndDate');
    $scope.competenceValid = localizationService.getLabel('humanResources_employee_competences_permanentlyValid');
    $scope.workExperienceActivePosition = localizationService.getLabel('humanResources_employee_activePosition');
    $scope.educationActive = localizationService.getLabel('humanResources_employee_education_appliedIndefinitely');
    $scope.action = $state.current.data.action;
    if ($state.params.id) {
        $scope.id = $state.params.id;
        humanResourcesEmployeeService.getEmployee($state.params.id).then(function (data) {
            $scope.employee = data;
            $scope.validFlag = false;
            $scope.employeeForm.$setPristine();
        });
    };
    $scope.$watch("workPermitValidityDate", function (value) {
        if(value == 'Invalid date')
            $scope.workPermitValidityDate = ''
    })

    $scope.$watch("employee", function (value) {
        $scope.birthDate = moment($scope.employee.birthDate).format('DD MM YYYY');
        $scope.workPermitValidityDate = moment($scope.employee.workPermitValidityDate).format('DD MM YYYY');
        $scope.personalCardValidityDate = moment($scope.employee.personalCardValidityDate).format('DD MM YYYY');
        $scope.backup = angular.copy($scope.employee);
        jQuery('#gender > option[value="' + $scope.employee.gender + '"]').attr("selected", "selected");

        if($scope.employee.firstName)
            $scope.validation['employeeFirstName'] = true;
        else
            $scope.validation['employeeFirstName'] = false;

        if ($scope.employee.lastName)
            $scope.validation['employeeLastName'] = true;
        else
            $scope.validation['employeeLastName'] = false;

        if ($scope.employee.personalMandatoryIdentificationNumber && $scope.employee.personalMandatoryIdentificationNumber.length == 11)
            $scope.validation['employeePersonalMandatoryIdentificationNumber'] = true;
        else
            $scope.validation['employeePersonalMandatoryIdentificationNumber'] = false;

        if ($scope.employee.parentsName)
            $scope.validation['employeeParentsName'] = true;
        else
            $scope.validation['employeeParentsName'] = false;

        if ($scope.employee.nationality)
            $scope.validation['employeeNationality'] = true;
        else
            $scope.validation['employeeNationality'] = false;

        if ($scope.validation['employeeNationality'] && $scope.validation['employeeParentsName']
                        && $scope.validation['employeeFirstName'] && $scope.validation['employeeLastName'] && $scope.validation['employeePersonalMandatoryIdentificationNumber'])
            $scope.validFlag = false;
        else
            $scope.validFlag = true;
        },true);

    $scope.validation = [];
    $scope.validation['employeeFirstName'] = false;
    $scope.validation['employeeLastName'] = false;
    $scope.validation['employeePersonalMandatoryIdentificationNumber'] = false;
    $scope.validation['employeeParentsName'] = false;
    $scope.validation['employeeNationality'] = false;

    $scope.$watch("employee.married", function () {
        if ($scope.employee.married == true) {
            jQuery('#married > option[value="Yes"]').attr("selected", "selected");
        }
        else {
            jQuery('#married > option[value="No"]').attr("selected", "selected");
        }
    });



    $scope.saveEmployee = function (employee) {
        if(employee.birthTownId == null)
            angular.forEach($scope.employee.towns, function (value, key) {
                if (value.name == employee.birthTown)
                    employee.birthTownId = value.id
            });
        if (employee.marriedStatus != null)
            employee.married = employee.marriedStatus;
        else {
            if (employee.married)
                employee.married = "Yes";
            else
                employee.married = "No";
        }
        if (employee.personalCardIssuedTownId != null)
            employee.personalCardIssuedTown = employee.personalCardIssuedTownId;

        humanResourcesEmployeeService.saveEmployee(employee).then(function () {
            $state.reload();
            bootbox.dialog({
                message: "Promjene su uspješno spremljene",
                title: "Obavijest",
                buttons: {
                    success: {
                        label: "OK",
                        className: "btn-success",
                        callback: function () {
                        }
                    }
                }
            });
        });
    };
    $scope.cancelEdit = function (employee) {
        $state.go('humanresources.employees');
    };

    $scope.residenceDialog = function (residence) {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/EmployeeAddEditAddressDialog',
            controller: ['$scope', 'humanResourcesMasterDataService', 'humanResourcesEmployeeService', function ($scope, humanResourcesMasterDataService, humanResourcesEmployeeService) {
                $scope.residence = {}
                if (residence != null)
                $scope.residence = residence;
                $scope.towns = $scope.$parent.towns;
                $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                if (residence != null) {
                    if (residence.toDate != null) {
                        $scope.toDate = moment($scope.residence.toDate).format('DD MM YYYY');
                        $scope.residence.checkbox = false;
                    }
                    else {
                        $scope.residence.checkbox = true;
                    }
                    $scope.fromDate = moment($scope.residence.fromDate).format('DD MM YYYY');
                }
                $scope.validation = []
                $scope.$watch("residence", function (value) {
                    if ($scope.residence.checkbox)
                        $scope.validation['dateToValid'] = true;
                    else if ($scope.residence.toDate != null)
                        $scope.validation['dateToValid'] = true;
                    else
                        $scope.validation['dateToValid'] = false;
                    if ($scope.residence.address)
                        $scope.validation['addressValid'] = true;
                    else
                        $scope.validation['addressValid'] = false;

                    if ($scope.residence.townId != null || $scope.residence.town != null)
                        $scope.validation['townValid'] = true;
                    else
                        $scope.validation['townValid'] = false;

                    if ($scope.residence.isPayroll != null)
                        $scope.validation['payrollValid'] = true;
                    else
                        $scope.validation['payrollValid'] = false;

                    if ($scope.residence.isInhabitance != null)
                        $scope.validation['inhabitanceValid'] = true;
                    else
                        $scope.validation['inhabitanceValid'] = false;

                    if ($scope.validation['inhabitanceValid'] && $scope.validation['payrollValid'] && $scope.validation['townValid']
                        && $scope.validation['addressValid'] && $scope.validation['dateToValid'] && $scope.validation['dateFromValid'])
                        $scope.formValid = true;
                    else
                        $scope.formValid = false;
                }, true);
                
                $scope.backup = angular.copy($scope.residence);
                if(residence!= null)
                    $scope.formValid = true;
                $scope.close = function () {
                    if(residence!= null)
                    {
                        $scope.residence.address = $scope.backup.address;
                        $scope.residence.toDate = $scope.backup.toDate;
                        $scope.residence.fromDate = $scope.backup.fromDate;
                        $scope.residence.isPayroll = $scope.backup.isPayroll;
                        $scope.residence.isInhabitance = $scope.backup.isInhabitance;
                        $scope.residence.town = $scope.backup.town;
                    }
                    dialog.close()
                }
                $scope.save = function (id, residence, towns, residences) {
                    var currentAddress = false;
                    var datesOverlap = false;
                    angular.forEach(towns, function (value, key) {
                        if (value.name == residence.town)
                            residence.townId = value.id
                    });
                    angular.forEach(residences, function (residence, key) {
                        if (residence.id != $scope.residence.id && $scope.residence.isInhabitance == residence.isInhabitance) {
                            if (residence.toDate != null && $scope.residence.toDate != null && (moment(residence.fromDate).isBefore($scope.residence.toDate) && moment(residence.toDate).isAfter($scope.residence.fromDate)))
                                datesOverlap = true
                            if (residence.toDate == null && (moment(residence.fromDate).isBefore($scope.residence.toDate)))
                                datesOverlap = true;
                            if ($scope.residence.toDate == null && (moment($scope.residence.fromDate).isBefore(residence.toDate)))
                                datesOverlap = true;
                            if (residence.toDate == null)
                                currentAddress = true;
                        }
                    })

                    if (residence.checkbox)
                        residence.toDate = null;
                    if (!$scope.residence.checkbox || (!currentAddress && $scope.residence.checkbox)) {
                        if (!datesOverlap)
                            humanResourcesEmployeeService.saveResidence(id, residence).then(function () {
                                if (residence == null) {
                                    dialog.close();
                                    $state.reload();
                                } else
                                    dialog.close();
                            });
                        else
                        {
                            alert("datumi se preklapaju");
                        }
                    }
                    else {
                        //prominit ovaj alert na bootbox sa porukom koju cemo dogovorit
                        alert('nije moguće spremanje, trenutna adresa već postoji');
                    }
                }

            }],
            className: 'ngdialog-theme-default',
            closeByDocument: false,
            closeByEscape: false,
            scope: $scope

        });
    };
    $scope.deleteResidence = function (id) {
        bootbox.dialog({
            message: 'Jeste li sigurni da želite obrisati mjesto stanovanja?',
            title: 'Potvrdite brisanje mjesta stanovanja',
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_masterData_competences_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        console.log(id);
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

    $scope.competenceDialog = function (competence) {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/EmployeeAddEditCompetenceDialog',
            controller: ['$scope', 'humanResourcesMasterDataService', 'humanResourcesEmployeeService', 'localizationService', function ($scope, humanResourcesMasterDataService, humanResourcesEmployeeService, localizationService) {
                $scope.competence = {};
                humanResourcesMasterDataService.getCompetences().then(function (data) {
                    $scope.competenceList = data;
                });
                $scope.backup = angular.copy(competence);
                $scope.competence.currentPositionFlag = false;
                if (competence != null) {
                    $scope.competence = competence;
                    $scope.competenceId
                    $scope.fromDate = moment($scope.competence.fromDate).format('DD MM YYYY');
                    if ($scope.competence.toDate != null) {
                        $scope.toDate = moment($scope.competence.toDate).format('DD MM YYYY');
                        $scope.competence.currentPositionFlag = false;
                    }
                    else
                        $scope.competence.currentPositionFlag = true;
                }
                $scope.validation = [];
                $scope.validation['dateFromValid'] = false;
                $scope.validation['dateToValid'] = false;
                $scope.validation['competenceValid'] = false;
                $scope.$watch("competence", function (value) {
                    if ($scope.competence.currentPositionFlag)
                        $scope.validation['dateToValid'] = true;
                    else if ($scope.competence.toDate)
                        $scope.validation['dateToValid'] = true;
                    else
                        $scope.validation['dateToValid'] = false;
                    if ($scope.competence.competenceId)
                        $scope.validation['competenceValid'] = true;
                    else
                        $scope.validation['competenceValid'] = false;


                    if ($scope.validation['competenceValid'] && $scope.validation['dateToValid'] && $scope.validation['dateFromValid'])
                        $scope.formValid = true;
                    else
                        $scope.formValid = false;
                }, true);
                $scope.toDateDisabled = false;
                $scope.$watch('competence.currentPositionFlag', function (value) {
                    if (value == true || value == 'true')
                        $scope.toDateDisabled = true;
                    else
                        $scope.toDateDisabled = false;
                })
                $scope.formValid = false;
                $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                $scope.close = function () {
                    if ($scope.backup != null) {
                        competence.competenceId = $scope.backup.competenceId;
                        competence.toDate = $scope.backup.toDate;
                        competence.fromDate = $scope.backup.fromDate;
                    }
                    dialog.close();
                }
                $scope.save = function (id, competence) {
                    humanResourcesEmployeeService.saveCompetence(id, competence).then(function () {
                        dialog.close();
                        $state.reload();
                    })

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
    $scope.deleteCompetence = function (competence) {
        bootbox.dialog({
            message: 'Jeste li sigurni da želite obrisati tečaj?',
            title: 'Potvrdite brisanje tečaja',
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_masterData_competences_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        humanResourcesEmployeeService.deleteCompetence(competence.id).then(function () {
                            $state.reload();
                        })
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

    $scope.workExperienceDialog = function (workExperience) {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/EmployeeAddEditWorkExperienceDialog',
            controller: ['$scope', 'humanResourcesMasterDataService', 'humanResourcesEmployeeService', 'localizationService', function ($scope, humanResourcesMasterDataService, humanResourcesEmployeeService, localizationService) {
                $scope.workExperience = {};
                $scope.backup = angular.copy(workExperience);
                $scope.workExperience.currentPositionFlag = false;
                if (workExperience != null) {
                    $scope.workExperience = workExperience;
                    $scope.fromDate = moment($scope.workExperience.fromDate).format('DD MM YYYY');
                    if ($scope.workExperience.toDate != null)
                    {
                        $scope.toDate = moment($scope.workExperience.toDate).format('DD MM YYYY');
                        $scope.workExperience.currentPositionFlag = false;
                    }
                    else
                        $scope.workExperience.currentPositionFlag = true;
                }
                $scope.validation = [];
                $scope.validation['dateFromValid'] = false;
                $scope.validation['dateToValid'] = false;
                $scope.validation['companyValid'] = false;
                $scope.validation['positionValid'] = false;
                $scope.$watch("workExperience", function (value) {
                    if ($scope.workExperience.currentPositionFlag)
                        $scope.validation['dateToValid'] = true;
                    else if ($scope.workExperience.toDate)
                        $scope.validation['dateToValid'] = true;
                    else
                        $scope.validation['dateToValid'] = false;
                    if ($scope.workExperience.company)
                        $scope.validation['companyValid'] = true;
                    else
                        $scope.validation['companyValid'] = false;

                    if ($scope.workExperience.position)
                        $scope.validation['positionValid'] = true;
                    else
                        $scope.validation['positionValid'] = false;

                    if ($scope.validation['positionValid'] && $scope.validation['companyValid']
                        && $scope.validation['dateToValid'] && $scope.validation['dateFromValid'])
                        $scope.formValid = true;
                    else
                        $scope.formValid = false;
                }, true);
                $scope.toDateDisabled = false;
                $scope.$watch('workExperience.currentPositionFlag', function (value) {
                    if (value == true || value == 'true')
                        $scope.toDateDisabled = true;
                    else
                        $scope.toDateDisabled = false;
                })
                $scope.formValid = false;
                $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                $scope.close = function () {
                    if ($scope.backup != null) {
                        workExperience.company = $scope.backup.company;
                        workExperience.position = $scope.backup.position;
                        workExperience.toDate = $scope.backup.toDate;
                        workExperience.fromDate = $scope.backup.fromDate;
                        workExperience.durationDays = $scope.backup.durationDays;
                        workExperience.durationMonths = $scope.backup.durationMonths;
                        workExperience.durationYears = $scope.backup.durationYears;
                    }
                    dialog.close();
                }
                $scope.save = function (id, workExperience) {
                    humanResourcesEmployeeService.saveWorkExperience(id, workExperience).then(function () {
                        dialog.close();
                        $state.reload();
                    })

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
    $scope.deleteWorkExperience = function (workExperience) {
        bootbox.dialog({
            message: 'Jeste li sigurni da želite obrisati radno iskustvo?',
            title: 'Potvrdite brisanje radnog iskustva',
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_masterData_competences_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        humanResourcesEmployeeService.deleteWorkExperience(workExperience.id).then(function () {
                            $state.reload();
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

    $scope.bankDialog = function (bank) {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/EmployeeAddEditBankAccountsDialog',
            controller: ['$scope', 'humanResourcesMasterDataService', 'humanResourcesEmployeeService', 'localizationService', function ($scope, humanResourcesMasterDataService, humanResourcesEmployeeService, localizationService) {
                $scope.bank = {};
                $scope.bank.isProtectedFlag = false;
                $scope.validFlag = true;
                if (bank != null) {
                    $scope.validFlag = false;
                    $scope.bank = bank;
                    $scope.backup = angular.copy(bank);
                }
                $scope.$watch("bank.isProtected", function () {
                    if($scope.bank.isProtected == true || $scope.bank.isProtected == "true")
                        $scope.bank.isProtectedFlag = true;
                    else
                        $scope.bank.isProtectedFlag = false;
                })
                $scope.bankList = $scope.$parent.banks  
                $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                $scope.validation = [];
                $scope.validation['bankAccountValid'] = false;
                $scope.validation['bankNameValid'] = false;
                $scope.validation['bankForPayrollValid'] = false;
                $scope.validation['bankProtectedValid'] = false;
                $scope.validation['bankAmountValid'] = false;
                $scope.$watch("bank", function (value) {
                    if ($scope.bank.isProtected == false || $scope.bank.isProtected == "false")
                        $scope.validation['bankAmountValid'] = true;
                    else if ($scope.bank.amount != null && $scope.bank.amount.match(/^\d+(?:\.\d+)?$/))
                        $scope.validation['bankAmountValid'] = true;
                    else
                        $scope.validation['bankAmountValid'] = false;
                    if ($scope.bank.accountNumber)
                        $scope.validation['bankAccountValid'] = true;
                    else
                        $scope.validation['bankAccountValid'] = false;

                    if ($scope.bank.bankId || $scope.bank.bank)
                        $scope.validation['bankNameValid'] = true;
                    else
                        $scope.validation['bankNameValid'] = false;

                    if ($scope.bank.isProtected)
                        $scope.validation['bankProtectedValid'] = true;
                    else
                        $scope.validation['bankProtectedValid'] = false;

                    if ($scope.bank.isPayroll)
                        $scope.validation['bankForPayrollValid'] = true;
                    else
                        $scope.validation['bankForPayrollValid'] = false;

                    if ($scope.validation['bankNameValid'] && $scope.validation['bankAccountValid']
                        && $scope.validation['bankAmountValid'] && $scope.validation['bankForPayrollValid'] &&  $scope.validation['bankProtectedValid'])
                        $scope.validFlag = false;
                    else
                        $scope.validFlag = true;
                }, true);

                $scope.close = function () {
                    $scope.bank.id = $scope.backup.id;
                    $scope.bank.accountNumber = $scope.backup.accountNumber;
                    $scope.bank.isPayroll = $scope.backup.isPayroll;
                    $scope.bank.amount = $scope.backup.amount;
                    $scope.bank.bank = $scope.backup.bank;
                    $scope.bank.bankId = $scope.backup.bankId;
                    $scope.bank.isProtected = $scope.backup.isProtected;
                    dialog.close()
                }
                $scope.save = function (id, bank) {
                    if(bank.bankId==null)
                    angular.forEach($scope.$parent.banks, function (value, key) {
                                if (value.name == bank.bank)
                                    bank.bankId = value.id
                            });
                    humanResourcesEmployeeService.saveBankAccount(id, bank).then(function () {

                        if (bank.id == null) {
                            angular.forEach($scope.$parent.banks, function (value, key) {
                                if (value.id == bank.bankId)
                                    bank.bank = value.name
                            });
                        }

                        dialog.close();
                        $state.reload();
                    })
                }

            }],
            className: 'ngdialog-theme-default',
            closeByDocument: false,
            closeByEscape: false,
            showClose: false,
            trapFocus :true,
            preserveFocus:true,
            scope: $scope
        });
    };
    $scope.deleteBank = function (bank) {
        bootbox.dialog({
            message: 'Jeste li sigurni da želite obrisati bankovni račun?',
            title: 'Potvrdite brisanje bankovnog računa',
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_masterData_competences_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        humanResourcesEmployeeService.deleteBankAccount(bank.id).then(function () {
                            $state.reload();
                        })
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

    $scope.educationDialog = function (education) {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/EmployeeAddEditEducationDialog',
            controller: ['$scope', 'humanResourcesMasterDataService', 'humanResourcesEmployeeService', 'localizationService', function ($scope, humanResourcesMasterDataService, humanResourcesEmployeeService, localizationService) {
                $scope.education = {};
                var flag = false;
                $scope.$watch('education.educationalInstitutionId', function (value) {
                    if (flag)
                        $scope.education.educationalRankId = null;
                    flag = true;
                })
                $scope.backup = angular.copy(education);
                $scope.education.currentEducationFlag = false;
                if (education != null) {
                    $scope.education = education;
                    $scope.fromDate = moment($scope.education.fromDate).format('DD MM YYYY');
                    if ($scope.education.toDate != null) {
                        $scope.toDate = moment($scope.education.toDate).format('DD MM YYYY');
                        $scope.education.currentEducationFlag = false;
                    }
                    else
                        $scope.education.currentEducationFlag = true;
                }
                $scope.validation = [];
                $scope.validation['dateFromValid'] = false;
                $scope.validation['dateToValid'] = false;
                $scope.validation['educationValid'] = false;
                $scope.validation['educationRankValid'] = false;
                $scope.$watch("education", function (value) {
                    if ($scope.education.currentEducationFlag)
                        $scope.validation['dateToValid'] = true;
                    else if ($scope.education.toDate)
                        $scope.validation['dateToValid'] = true;
                    else
                        $scope.validation['dateToValid'] = false;
                    if ($scope.education.educationalInstitutionId)
                        $scope.validation['educationValid'] = true;
                    else
                        $scope.validation['educationValid'] = false;
                    if ($scope.education.educationalRankId)
                        $scope.validation['educationRankValid'] = true;
                    else
                        $scope.validation['educationRankValid'] = false;



                    if ($scope.validation['educationValid'] && $scope.validation['dateToValid'] && $scope.validation['dateFromValid'] && $scope.validation['educationRankValid'])
                        $scope.formValid = true;
                    else
                        $scope.formValid = false;
                }, true);
                $scope.toDateDisabled = false;
                $scope.$watch('education.currentEducationFlag', function (value) {
                    if (value == true || value == 'true'){
                    $scope.toDateDisabled = true;
                    $scope.education.toDate = null;
                    $scope.toDate = null;
                    $('#DateTo').val('');
                }
                    else
                        $scope.toDateDisabled = false;
                })
                $scope.formValid = false;
                $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                $scope.close = function () {
                    if ($scope.backup != null) {
                        education.educationId = $scope.backup.educationalInstitutionId;
                        education.rankId = $scope.backup.educationalRankId;
                        education.toDate = $scope.backup.toDate;
                        education.fromDate = $scope.backup.fromDate;
                    }
                    dialog.close();
                }
                $scope.save = function (id, education) {
                    humanResourcesEmployeeService.saveEducation(id, education).then(function () {
                        dialog.close();
                        $state.reload();
                    })

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
    $scope.deleteEducation = function (education) {
        bootbox.dialog({
            message: 'Jeste li sigurni da želite obrisati obrazovanje?',
            title: 'Potvrdite brisanje obrazovanja',
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_masterData_competences_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        humanResourcesEmployeeService.deleteEducation(education.id).then(function () {
                            $state.reload();
                        })
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

    $scope.salaryAdditionsDialog = function (salaryAddition,bankList)
    {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/EmployeeAddEditSalaryAdditionDialog',
            controller: ['$scope', 'humanResourcesMasterDataService', 'humanResourcesEmployeeService', 'localizationService', 'identityService', function ($scope, humanResourcesMasterDataService, humanResourcesEmployeeService, localizationService, identityService) {
                $scope.salaryAddition = {};
                $scope.bankList = bankList;
                humanResourcesMasterDataService.getSalaryAdditions($scope.$parent.defaultCompanyId).then(function (data) {
                    $scope.salaryAdditionsList = data;
                });
                $scope.backup = angular.copy(salaryAddition);
                $scope.salaryAddition.currentAdditionFlag = false;
                if (salaryAddition != null) {
                    $scope.salaryAddition = salaryAddition;
                    $scope.fromDate = moment($scope.salaryAddition.fromDate).format('DD MM YYYY');
                    if ($scope.salaryAddition.toDate != null) {
                        $scope.toDate = moment($scope.salaryAddition.toDate).format('DD MM YYYY');
                        $scope.salaryAddition.currentAdditionFlag = false;
                    }
                    else
                        $scope.salaryAddition.currentAdditionFlag = true;
                }
                $scope.validation = [];
                $scope.validation['dateFromValid'] = false;
                $scope.validation['dateToValid'] = false;
                $scope.validation['amountValid'] = false;
                $scope.validation['additionValid'] = false;
                $scope.validation['bankValid'] = false;
                $scope.$watch("salaryAddition", function (value) {
                    if ($scope.salaryAddition.currentAdditionFlag == true || $scope.salaryAddition.currentAdditionFlag == "true")
                        $scope.validation['dateToValid'] = true;
                    else if ($scope.salaryAddition.toDate)
                        $scope.validation['dateToValid'] = true;
                    else
                        $scope.validation['dateToValid'] = false;
                    if ($scope.salaryAddition.fromDate)
                        $scope.validation['dateFromValid'] = true;
                    else
                        $scope.validation['dateFromValid'] = false;
                    if ($scope.salaryAddition.amount)
                        $scope.validation['amountValid'] = true;
                    else
                        $scope.validation['amountValid'] = false;
                    if ($scope.salaryAddition.bankAccount || $scope.salaryAddition.salaryAdditionBankId)
                        $scope.validation['bankValid'] = true;
                    else
                        $scope.validation['bankValid'] = false;

                    if ($scope.salaryAddition.addition || $scope.salaryAddition.salaryAdditionId)
                        $scope.validation['additionValid'] = true;
                    else
                        $scope.validation['additionValid'] = false;

                    if ($scope.validation['dateToValid'] && $scope.validation['dateFromValid']
                        && $scope.validation['amountValid'] && $scope.validation['bankValid'] && $scope.validation['additionValid'])
                        $scope.formValid = true;
                    else
                        $scope.formValid = false;
                }, true);
                $scope.toDateDisabled = false;
                $scope.$watch('salaryAddition.currentAdditionFlag', function (value) {
                    if (value == true || value == 'true')
                    {
                        $scope.toDateDisabled = true;
                        $scope.salaryAddition.toDate = null;
                        $scope.toDate = null;
                        $('#salaryAdditionDateTo').val('');
                    }
                    else
                        $scope.toDateDisabled = false;
                })
                $scope.formValid = false;
                $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                $scope.close = function () {
                    if ($scope.backup != null) {
                        salaryAddition.toDate = $scope.backup.toDate;
                        salaryAddition.fromDate = $scope.backup.fromDate;
                        salaryAddition.amount = $scope.backup.amount;
                        salaryAddition.addition = $scope.backup.addition;
                        salaryAddition.bankAccount = $scope.backup.bankAccount;
                    }
                    dialog.close();
                }
                $scope.save = function (id, salaryAddition) {
                    if (salaryAddition.salaryAdditionId == null)
                    {
                        angular.forEach($scope.salaryAdditionsList, function (value, key) {
                            if (value.name == salaryAddition.addition)
                                salaryAddition.salaryAdditionId = value.id
                        });
                    }
                    if (salaryAddition.salaryAdditionBankId == null) {
                        angular.forEach($scope.bankList, function (value, key) {
                            if (value.accountNumber == salaryAddition.bankAccount)
                                salaryAddition.salaryAdditionBankId = value.id
                        });
                    }
                    humanResourcesEmployeeService.saveSalaryAddition(id, salaryAddition).then(function () {
                        dialog.close();
                        $state.reload();
                    })

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
    }
    $scope.deleteSalaryAddition = function (salaryAddition)
    {
        bootbox.dialog({
            message: 'Jeste li sigurni da želite obrisati dodatak na plaću?',
            title: 'Potvrdite brisanje dodatka na plaču',
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_masterData_competences_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        humanResourcesEmployeeService.deleteSalaryAddition(salaryAddition.id).then(function () {
                            $state.reload();
                        })
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
    }

    $scope.salarySuspensionsDialog = function (salarySuspension, bankList) {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/EmployeeAddEditSalarySuspensionsDialog',
            controller: ['$scope', 'humanResourcesMasterDataService', 'humanResourcesEmployeeService', 'localizationService', 'identityService', function ($scope, humanResourcesMasterDataService, humanResourcesEmployeeService, localizationService, identityService) {
                $scope.salarySuspension = {};
                $scope.bankList = bankList;
                humanResourcesMasterDataService.getSalarySuspensions($scope.$parent.defaultCompanyId).then(function (data) {
                    $scope.salarySuspensionsList = data;
                });
                $scope.backup = angular.copy(salarySuspension);
                $scope.salarySuspension.currentSuspensionFlag = false;
                if (salarySuspension != null) {
                    $scope.salarySuspension = salarySuspension;
                    $scope.fromDate = moment($scope.salarySuspension.fromDate).format('DD MM YYYY');
                    if ($scope.salarySuspension.toDate != null) {
                        $scope.toDate = moment($scope.salarySuspension.toDate).format('DD MM YYYY');
                        $scope.salarySuspension.currentSuspensionFlag = false;
                    }
                    else
                        $scope.salarySuspension.currentSuspensionFlag = true;
                }
                $scope.validation = [];
                $scope.validation['dateFromValid'] = false;
                $scope.validation['dateToValid'] = false;
                $scope.validation['amountValid'] = false;
                $scope.validation['suspensionValid'] = false;
                $scope.validation['bankValid'] = false;
                $scope.$watch("salarySuspension", function (value) {
                    if ($scope.salarySuspension.currentSuspensionFlag == true || $scope.salarySuspension.currentSuspensionFlag == "true")
                        $scope.validation['dateToValid'] = true;
                    else if ($scope.salarySuspension.toDate)
                        $scope.validation['dateToValid'] = true;
                    else
                        $scope.validation['dateToValid'] = false;
                    if ($scope.salarySuspension.fromDate)
                        $scope.validation['dateFromValid'] = true;
                    else
                        $scope.validation['dateFromValid'] = false;
                    if ($scope.salarySuspension.amount)
                        $scope.validation['amountValid'] = true;
                    else
                        $scope.validation['amountValid'] = false;
                    if ($scope.salarySuspension.bankAccount || $scope.salarySuspension.salarySuspensionBankId)
                        $scope.validation['bankValid'] = true;
                    else
                        $scope.validation['bankValid'] = false;

                    if ($scope.salarySuspension.suspension || $scope.salarySuspension.salarySuspensionId)
                        $scope.validation['suspensionValid'] = true;
                    else
                        $scope.validation['suspensionValid'] = false;

                    if ($scope.validation['dateToValid'] && $scope.validation['dateFromValid']
                        && $scope.validation['suspensionValid'] && $scope.validation['bankValid'] && $scope.validation['amountValid'])
                        $scope.formValid = true;
                    else
                        $scope.formValid = false;
                }, true);
                $scope.toDateDisabled = false;
                $scope.$watch('salarySuspension.currentSuspensionFlag', function (value) {
                    if (value == true || value == 'true')
                    {
                        $scope.toDateDisabled = true;
                        $scope.salaryAddition.toDate = null;
                        $scope.toDate = null;
                        $('#salarySuspensionDateTo').val('');
                    }
                    else
                        $scope.toDateDisabled = false;
                })
                $scope.formValid = false;
                $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                $scope.close = function () {
                    if ($scope.backup != null) {
                        salarySuspension.toDate = $scope.backup.toDate;
                        salarySuspension.fromDate = $scope.backup.fromDate;
                        salarySuspension.amount = $scope.backup.amount;
                        salarySuspension.suspension = $scope.backup.suspension;
                        salarySuspension.bankAccount = $scope.backup.bankAccount;
                    }
                    dialog.close();
                }
                $scope.save = function (id, salarySuspension) {
                    if (salarySuspension.salarySuspensionId == null) {
                        angular.forEach($scope.salarySuspensionsList, function (value, key) {
                            if (value.name == salarySuspension.suspension)
                                salarySuspension.salarySuspensionId = value.id
                        });
                    }
                    if (salarySuspension.salarySuspensionBankId == null) {
                        angular.forEach($scope.bankList, function (value, key) {
                            if (value.accountNumber == salarySuspension.bankAccount)
                                salarySuspension.salarySuspensionBankId = value.id
                        });
                    }
                    humanResourcesEmployeeService.saveSalarySuspension(id, salarySuspension).then(function () {
                        dialog.close();
                        $state.reload();
                    })

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
    }
    $scope.deleteSalarySuspension = function (salarySuspension) {
        bootbox.dialog({
            message: 'Jeste li sigurni da želite obrisati odbitak od plaće?',
            title: 'Potvrdite brisanje odbitka od plače',
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_masterData_competences_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        humanResourcesEmployeeService.deleteSalarySuspension(salarySuspension.id).then(function () {
                            $state.reload();
                        })
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
    }

    $scope.feesFromSalaryDialog = function (feeFromSalary) {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/EmployeeAddEditFeesFromSalaryDialog',
            controller: ['$scope', 'settingsService', 'humanResourcesEmployeeService', 'localizationService', 'identityService', function ($scope, settingsService, humanResourcesEmployeeService, localizationService, identityService) {
                $scope.feeFromSalary = {};
                settingsService.getFeesFromSalary().then(function (data) {
                    $scope.feesFromSalaryList = data;
                });
                $scope.backup = angular.copy(feeFromSalary);
                if (feeFromSalary != null) {
                    $scope.feeFromSalary = feeFromSalary;
                }
                $scope.validation = [];
                $scope.validation['percentageValid'] = false;
                $scope.validation['feeValid'] = false;
                $scope.$watch("feeFromSalary", function (value) {
                   
                    if ($scope.feeFromSalary.feeName || $scope.feeFromSalary.feeId)
                        $scope.validation['feeValid'] = true;
                    else
                        $scope.validation['feeValid'] = false;

                    if ($scope.feeFromSalary.percentage)
                        $scope.validation['percentageValid'] = true;
                    else
                        $scope.validation['percentageValid'] = false;

                    if ($scope.validation['percentageValid'] && $scope.validation['feeValid'])
                        $scope.formValid = true;
                    else
                        $scope.formValid = false;
                }, true);
                
                $scope.formValid = false;
                $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                $scope.close = function () {
                    if ($scope.backup != null) {
                        feeFromSalary.percentage = $scope.backup.percentage;
                        feeFromSalary.feeName = $scope.backup.feeName;
                    }
                    dialog.close();
                }

                $scope.save = function (id, feeFromSalary) {
                    if (feeFromSalary.feeId == null) {
                        angular.forEach($scope.feesFromSalaryList, function (value, key) {
                            if (value.name == feeFromSalary.feeName)
                                feeFromSalary.feeId = value.id
                        });
                    }
                    
                    humanResourcesEmployeeService.saveFeeFromSalary(id, feeFromSalary).then(function () {
                        dialog.close();
                        $state.reload();
                    })

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
    }
    $scope.deleteFeeFromSalary = function (feeFromSalary) {
        bootbox.dialog({
            message: 'Jeste li sigurni da želite obrisati fee from salary?',
            title: 'Potvrdite brisanje',
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_masterData_competences_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        humanResourcesEmployeeService.deleteFeeFromSalary(feeFromSalary.id).then(function () {
                            $state.reload();
                        })
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
    }

    $scope.feesToSalaryDialog = function (feeToSalary) {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/EmployeeAddEditFeesToSalaryDialog',
            controller: ['$scope', 'settingsService', 'humanResourcesEmployeeService', 'localizationService', 'identityService', function ($scope, settingsService, humanResourcesEmployeeService, localizationService, identityService) {
                $scope.feeToSalary = {};
                settingsService.getFeesToSalary().then(function (data) {
                    $scope.feesToSalaryList = data;
                });
                $scope.backup = angular.copy(feeToSalary);
                if (feeToSalary != null) {
                    $scope.feeToSalary = feeToSalary;
                }
                $scope.validation = [];
                $scope.validation['percentageValid'] = false;
                $scope.validation['feeValid'] = false;
                $scope.$watch("feeToSalary", function (value) {

                    if ($scope.feeToSalary.feeName || $scope.feeToSalary.feeId)
                        $scope.validation['feeValid'] = true;
                    else
                        $scope.validation['feeValid'] = false;

                    if ($scope.feeToSalary.percentage)
                        $scope.validation['percentageValid'] = true;
                    else
                        $scope.validation['percentageValid'] = false;

                    if ($scope.validation['percentageValid'] && $scope.validation['feeValid'])
                        $scope.formValid = true;
                    else
                        $scope.formValid = false;
                }, true);

                $scope.formValid = false;
                $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                $scope.close = function () {
                    if ($scope.backup != null) {
                        feeToSalary.percentage = $scope.backup.percentage;
                        feeToSalary.feeName = $scope.backup.feeName;
                    }
                    dialog.close();
                }

                $scope.save = function (id, feeToSalary) {
                    if (feeToSalary.feeId == null) {
                        angular.forEach($scope.feesToSalaryList, function (value, key) {
                            if (value.name == feeToSalary.feeName)
                                feeToSalary.feeId = value.id
                        });
                    }

                    humanResourcesEmployeeService.saveFeeToSalary(id, feeToSalary).then(function () {
                        dialog.close();
                        $state.reload();
                    })

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
    }
    $scope.deleteFeeToSalaryDialog = function (feeToSalary) {
        bootbox.dialog({
            message: 'Jeste li sigurni da želite obrisati fee to salary?',
            title: 'Potvrdite brisanje',
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_masterData_competences_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        humanResourcesEmployeeService.deleteFeeToSalary(feeToSalary.id).then(function () {
                            $state.reload();
                        })
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
    }
    
    $scope.salaryTaxesDialog = function (salaryTax) {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/EmployeeAddEditSalaryTaxDialog',
            controller: ['$scope', 'settingsService', 'humanResourcesEmployeeService', 'localizationService', 'identityService', function ($scope, settingsService, humanResourcesEmployeeService, localizationService, identityService) {
                $scope.salaryTax = {};
                settingsService.getSalaryTaxes().then(function (data) {
                    $scope.salaryTaxesList = data;
                });
                $scope.backup = angular.copy(salaryTax);
                $scope.salaryTax.currentTaxFlag = false;
                if (salaryTax != null) {
                    $scope.salaryTax = salaryTax;
                    $scope.fromDate = moment($scope.salaryTax.fromDate).format('DD MM YYYY');
                    if ($scope.salaryTax.toDate != null) {
                        $scope.toDate = moment($scope.salaryTax.toDate).format('DD MM YYYY');
                        $scope.salaryTax.currentTaxFlag = false;
                    }
                    else
                        $scope.salaryTax.currentTaxFlag = true;

                }
                $scope.validation = [];
                $scope.validation['upperAmountValid'] = false;
                $scope.validation['taxValid'] = false;
                $scope.validation['dateFromValid'] = false;
                $scope.validation['dateToValid'] = false;
                $scope.$watch("salaryTax", function (value) {
    
                    if ($scope.salaryTax.currentTaxFlag == true || $scope.salaryTax.currentTaxFlag == "true")
                        $scope.validation['dateToValid'] = true;
                    else if ($scope.salaryTax.toDate)
                        $scope.validation['dateToValid'] = true;
                    else
                        $scope.validation['dateToValid'] = false;
                    if ($scope.salaryTax.fromDate)
                        $scope.validation['dateFromValid'] = true;
                    else
                        $scope.validation['dateFromValid'] = false;

                    if ($scope.salaryTax.taxId)
                        $scope.validation['taxValid'] = true;
                    else
                        $scope.validation['taxValid'] = false;

                    if ($scope.salaryTax.upperAmount)
                        $scope.validation['upperAmountValid'] = true;
                    else
                        $scope.validation['upperAmountValid'] = false;

                    if ($scope.validation['upperAmountValid'] && $scope.validation['taxValid']
                        && $scope.validation['dateToValid'] && $scope.validation['dateToValid'])
                        $scope.formValid = true;
                    else
                        $scope.formValid = false;
                }, true);

                $scope.$watch('salaryTax.currentTaxFlag', function (value) {
                    if (value == true || value == 'true') {
                        $scope.toDateDisabled = true;
                        $scope.salaryTax.toDate = null;
                        $scope.toDate = null;
                        $('#DateTo').val('');
                    }
                    else
                        $scope.toDateDisabled = false;
                })

                $scope.$watch('salaryTax.taxId', function (taxId) {
                    angular.forEach($scope.salaryTaxesList, function (value, key) {
                        if (value.id == taxId) {
                            $scope.salaryTax.percentage = value.percentage
                            $scope.salaryTax.upperAmount = value.upperAmount;
                        }
                    });
                })
                $scope.formValid = false;
                $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                $scope.close = function () {
                    if ($scope.backup != null) {
                        salaryTax.percentage = $scope.backup.percentage;
                        salaryTax.upperAmount = $scope.backup.upperAmount;
                        salaryTax.fromDate = $scope.backup.fromDate;
                        salaryTax.toDate = $scope.backup.toDate;
                    }
                    dialog.close();
                }

                $scope.save = function (id, salaryTax) {
                    
                    humanResourcesEmployeeService.saveSalaryTax(id, salaryTax).then(function () {
                        dialog.close();
                        $state.reload();
                    })

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
    }
    $scope.deleteSalaryTaxesDialog = function (salaryTax) {
        bootbox.dialog({
            message: 'Jeste li sigurni da želite obrisati odabrani porez?',
            title: 'Potvrdite brisanje',
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_masterData_competences_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        humanResourcesEmployeeService.deleteSalaryTax(salaryTax.id).then(function () {
                            $state.reload();
                        })
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
    }

    $scope.workingHourFactorDialog = function (workingHourFactor) {
        var dialog = ngDialog.open({
            template: '/template/HumanResources/EmployeeAddEditWorkingHourFactorsDialog',
            controller: ['$scope', 'settingsService', 'humanResourcesEmployeeService', 'localizationService', 'identityService', function ($scope, settingsService, humanResourcesEmployeeService, localizationService, identityService) {
                $scope.workingHourFactor = {};
                settingsService.getWorkingHourFactors(identityService.getIdentity().defaultCompanyId).then(function (data) {
                    $scope.workingHourFactorsList = data;
                });
                $scope.backup = angular.copy(workingHourFactor);
                $scope.workingHourFactor.currentWorkingHourFlag = false;
                if (workingHourFactor != null) {
                    $scope.workingHourFactor = workingHourFactor;
                    $scope.fromDate = moment($scope.workingHourFactor.fromDate).format('DD MM YYYY');
                    if ($scope.workingHourFactor.toDate != null) {
                        $scope.toDate = moment($scope.workingHourFactor.toDate).format('DD MM YYYY');
                        $scope.workingHourFactor.currentWorkingHourFlag = false;
                    }
                    else
                        $scope.workingHourFactor.currentWorkingHourFlag = true;
                }
                $scope.validation = [];
                $scope.validation['factorValid'] = false;
                $scope.validation['typeValid'] = false;
                $scope.validation['dateFromValid'] = false;
                $scope.validation['dateToValid'] = false;
                
                $scope.$watch("workingHourFactor", function (value) {
                    if ($scope.workingHourFactor.currentWorkingHourFlag == true || $scope.workingHourFactor.currentWorkingHourFlag == "true")
                        $scope.validation['dateToValid'] = true;
                    else if ($scope.workingHourFactor.toDate)
                        $scope.validation['dateToValid'] = true;
                    else
                        $scope.validation['dateToValid'] = false;
                    if ($scope.workingHourFactor.fromDate)
                        $scope.validation['dateFromValid'] = true;
                    else
                        $scope.validation['dateFromValid'] = false;
                    if ($scope.workingHourFactor.factor)
                        $scope.validation['factorValid'] = true;
                    else
                        $scope.validation['factorValid'] = false;

                    if ($scope.workingHourFactor.workingHourType)
                        $scope.validation['typeValid'] = true;
                    else
                        $scope.validation['typeValid'] = false;

                    if ($scope.validation['factorValid'] && $scope.validation['typeValid'] && $scope.validation['dateFromValid'] && $scope.validation['dateToValid'])
                        $scope.formValid = true;
                    else
                        $scope.formValid = false;
                }, true);

                $scope.formValid = false;
                $scope.yesNoSelectOptions = [{ name: localizationService.getLabel('humanResources_employee_yes'), value: true }, { name: localizationService.getLabel('humanResources_employee_no'), value: false }];
                $scope.close = function () {
                    if ($scope.backup != null) {
                        workingHourFactor.factor = $scope.backup.factor;
                    }
                    dialog.close();
                }

                $scope.$watch('workingHourFactor.currentWorkingHourFlag', function (value) {
                    if (value == true || value == 'true') {
                        $scope.toDateDisabled = true;
                        $scope.workingHourFactor.toDate = null;
                        $scope.toDate = null;
                        $('#WorkingHourFactorDateTo').val('');
                    }
                    else
                        $scope.toDateDisabled = false;
                })
                $scope.$watch('workingHourFactor.factorId', function (id) {
                    angular.forEach($scope.workingHourFactorsList, function (value, key) {
                        if (value.id == id) {
                            $scope.workingHourFactor.factor = value.factor
                            $scope.workingHourFactor.workingHourType = value.workingHourType
                        }
                    });
                })
                $scope.save = function (id, workingHourFactor) {
                    if (workingHourFactor.factorId == null) {
                        angular.forEach($scope.workingHourFactorsList, function (value, key) {
                            if (value.workingHourType == workingHourFactor.workingHourType)
                                workingHourFactor.factorId = value.id
                        });
                    }

                    humanResourcesEmployeeService.saveWorkingHourFactor(id, workingHourFactor).then(function () {
                        dialog.close();
                        $state.reload();
                    })

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
    }
    $scope.deleteWorkingHourFactorDialog = function (workingHourFactor) {
        bootbox.dialog({
            message: 'Jeste li sigurni da želite obrisati odabrani faktor sati?',
            title: 'Potvrdite brisanje',
            buttons: {
                success: {
                    label: localizationService.getLabel('humanResources_masterData_competences_confirmDeleting'),
                    className: "btn-flat btn-success",
                    callback: function () {
                        humanResourcesEmployeeService.deleteWorkingHourFactor(workingHourFactor.id).then(function () {
                            $state.reload();
                        })
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
    }
}]);