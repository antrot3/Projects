'use strict';

var humanResourcesApp = angular.module('humanResources', ['ui.router', 'helpers', 'ngDialog', 'ui.select', 'ngSanitize']);

humanResourcesApp.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('humanresources', {
          url: '/humanresources',
          views: {
              '': { templateUrl: '/template/layout' },
              'main@humanresources': { templateUrl: '/template/humanresources/dashboard' },
              'menu@humanresources': { templateUrl: '/template/humanresources/menu' }
          },
          data: {
              mainContentLabel: 'humanResources_dashboard'
          }
      })
      .state('humanresources.banks', {
          url: '/banks',
          templateUrl: '/template/humanresources/banks',
          data: {
              mainContentLabel: 'humanResources_banks'
          }
      })
      .state('humanresources.bankadd', {
          url: '/bank/add',
          templateUrl: '/template/humanresources/bankaddedit',
          data: {
              mainContentLabel: 'humanResources_banks_edit'
          }
      })
        .state('humanresources.bankedit', {
            url: '/bank/edit/{id}',
            templateUrl: '/template/humanresources/bankaddedit',
            data: {
                mainContentLabel: 'humanResources_banks_edit'
            }
        })
        .state('humanresources.fees', {
            url: '/fees',
            templateUrl: '/template/humanresources/fees',
            data: {
                mainContentLabel: 'humanResources_fees'
            }
        })
        .state('humanresources.workinghourfactors', {
            url: '/workinghourfactors',
            templateUrl: '/template/humanresources/workinghourfactors',
            data: {
                mainContentLabel: 'humanResources_settings_workingHourFactorsTitle'
            }
        })
       .state('humanresources.salaryadditionsandsuspensions', {
            url: '/salaryadditionsandsuspensions',
            templateUrl: '/template/humanresources/salaryadditionsandsuspensions',
            data: {
                mainContentLabel: 'humanResources_salaryadditionsandsuspensions'
            }
        })

       .state('humanresources.countiesandtowns', {
           url: '/countiesandtowns',
           templateUrl: '/template/humanresources/countiesandtowns',
           data: {
               mainContentLabel: 'humanResources_countiesAndTowns'
           }
       })
      .state('humanresources.competences', {
          url: '/competences',
          templateUrl: '/template/humanresources/competences',
          data: {
              mainContentLabel: 'humanResources_masterData_competences'
          }
      })
         .state('humanresources.competenceadd', {
             url: '/competence/add',
             templateUrl: '/template/humanresources/competenceaddedit',
             data: {
                 mainContentLabel: 'humanResources_masterData_competences_addNewCompetenceTitle'
             }
         })
        .state('humanresources.competenceedit', {
            url: '/competence/edit/{id}',
            templateUrl: '/template/humanresources/competenceaddedit',
            data: {
                mainContentLabel: 'humanResources_masterData_competences_editCompetence'
            }
        })
      .state('humanresources.educationalinstitutions', {
          url: '/educationalinstitutions',
          templateUrl: '/template/humanresources/educationalinstitutions',
          data: {
              mainContentLabel: 'humanResources_educationalInstitutions'
          }
      })
      .state('humanresources.educationalinstitutionadd', {
          url: '/educationalinstitution/add',
          templateUrl: '/template/humanresources/educationalinstitutionaddedit',
          data: {
              mainContentLabel: 'humanResources_educationalInstitutions_AddEducationalInstitution',
              action:'add'
          }
      })
       .state('humanresources.educationalinstitutionedit', {
           url: '/educationalinstitution/edit/{id}',
           templateUrl: '/template/humanresources/educationalinstitutionaddedit',
           data: {
               mainContentLabel: 'humanResources_educationalInstitutions_edit',
               action:'edit'
           }
       })
      .state('humanresources.employees', {
          url: '/employees',
          templateUrl: '/template/humanresources/employees',
          data: {
              mainContentLabel: 'humanResources_employee_list'
          }
      })
      .state('humanresources.employeeadd', {
          url: '/employee/add',
          templateUrl: '/template/humanresources/employeeadd',
          data: {
              mainContentLabel: 'humanResources_employee_addNew'
          }
      })
      .state('humanresources.employeeedit', {
          url: '/employee/edit/{id}',
          templateUrl: '/template/humanresources/employeeedit',
          data: {
              mainContentLabel: 'humanResources_employee_details',
              action: 'edit'
          }
      })
    .state('humanresources.employeeview', {
        url: '/employee/view/{id}',
        templateUrl: '/template/humanresources/employeeedit',
        data: {
            mainContentLabel: 'humanResources_employee_details',
            action: 'view'
        }
    })
      .state('humanresources.payrolls', {
          url: '/payrolls',
          templateUrl: '/template/humanresources/payrolls',
          data: {
              mainContentLabel: ''
          }
      })
      .state('humanresources.payrolladd', {
          url: '/payroll/add',
          templateUrl: '/template/humanresources/payrolladd',
          data: {
              mainContentLabel: ''
          }
      })
      .state('humanresources.payrolledit', {
          url: '/payroll/edit/{id}',
          templateUrl: '/template/humanresources/payrolledit',
          data: {
              mainContentLabel: ''
          }
      })
      .state('humanresources.payrollitemedit', {
          url: '/payroll/{payrollId}/edit/{payrollItemId}',
          templateUrl: '/template/humanresources/payrollitemedit',
          data: {
              mainContentLabel: ''
          }
      })
      .state('humanresources.payrollitemnew', {
          url: '/payroll/{payrollId}/new',
          templateUrl: '/template/humanresources/payrollitemadd',
          data: {
              mainContentLabel: ''
          }
      })
      .state('humanresources.joppds', {
          url: '/joppds',
          templateUrl: '/template/humanresources/joppds',
          data: {
              mainContentLabel: ''
          }
      })
      .state('humanresources.joppdadd', {
          url: '/joppd/add',
          templateUrl: '/template/humanresources/joppdaddedit',
          data: {
              mainContentLabel: ''
          }
      })
      .state('humanresources.joppdedit', {
          url: '/joppd/edit/{id}',
          templateUrl: '/template/humanresources/joppdaddedit',
          data: {
              mainContentLabel: ''
          }
      })
      .state('humanresources.joppditemedit', {
          url: '/joppd/{joppdId}/edit/{joppdItemId}',
          templateUrl: '/template/humanresources/joppditemaddedit',
          data: {
              mainContentLabel: ''
          }
      })
      .state('humanresources.joppditemnew', {
          url: '/joppd/{joppdId}/new',
          templateUrl: '/template/humanresources/joppditemaddedit',
          data: {
              mainContentLabel: ''
          }
      })

    .state('humanresources.salarytax', {
        url: '/salarytax',
        templateUrl: '/template/humanresources/salarytax',
        data: {
            mainContentLabel: 'humanResources_salaryTaxes'
        }
    });
}]);