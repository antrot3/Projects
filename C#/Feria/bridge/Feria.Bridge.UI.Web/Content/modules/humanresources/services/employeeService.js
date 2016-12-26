humanResourcesApp.factory('humanResourcesEmployeeService', ['$http', '$q', 'applicationSettings', function ($http, $q, applicationSettings) {

    return {
        getEmployee: function (id) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'employee/employee/get?employeeId=' + id)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },
        saveWorkExperience: function (id, workExperience) {
            var urlData = 'company=' + workExperience.company;
            urlData += '&position=' + workExperience.position;
            if (workExperience.id != null && workExperience.id != 'undefined')
                urlData += '&id=' + workExperience.id;
            urlData += '&employeeId=' + id;
            urlData += '&fromDate=' + workExperience.fromDate;
            if (workExperience.currentPositionFlag == false || workExperience.currentPositionFlag == "false")
                urlData += '&toDate=' + workExperience.toDate;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/saveworkexperience', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        getEmployeeCardPdf: function (id) {

            var deferred = $q.defer();

            $http.get(applicationSettings.humanResourcesAPIUrl + 'employee/employee/PrintEmployeeCard?employeeId=' + id, { responseType: 'arraybuffer' })
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });

            return deferred.promise;

        },

        deleteWorkExperience: function (id) {
            var urlData = 'Id=' + id;

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/deleteworkexperience', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        saveCompetence: function (id, competence) {
            var urlData = 'competenceId=' + competence.competenceId;
            urlData += '&fromDate=' + competence.fromDate;
            if (competence.id != null && competence.id != 'undefined')
                urlData += '&id=' + competence.id;
            urlData += '&employeeId=' + id;
            if (competence.currentPositionFlag == false || competence.currentPositionFlag == "false")
                urlData += '&toDate=' + competence.toDate;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/savecompetence', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        deleteCompetence: function (id) {
            var urlData = 'id=' + id;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/deletecompetence', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        saveBankAccount: function (id, bank) {
            var urlData = 'AccountNumber=' + bank.accountNumber;
            if (bank.id != null && bank.id != 'undefined')
                urlData += '&id=' + bank.id;
            urlData += '&bankId=' + bank.bankId;
            urlData += '&employeeId=' + id;
            urlData += '&isPayroll=' + bank.isPayroll;
            urlData += '&isProtected=' + bank.isProtected;
            if (bank.isProtected)
                urlData += '&amount=' + bank.amount;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/savebankaccount', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },
        deleteBankAccount: function (id) {
            var urlData = 'Id=' + id;
            
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/deletebankaccount', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },
        saveResidence: function (id, residence) {
            var urlData = 'Address=' + residence.address;
            if(residence.id != null)
            urlData += '&id=' + residence.id;
            urlData += '&fromDate=' + residence.fromDate;
            if (residence.toDate != null)
            urlData += '&toDate=' + residence.toDate;
            urlData += '&isInhabitance=' + residence.isInhabitance;
            urlData += '&isPayroll=' + residence.isPayroll;
            urlData += '&employeeId=' + id;
            urlData += '&townId=' + residence.townId;

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/saveresidence', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },
        saveEmployee: function (employee) {
            var urlData = 'LastName=' + employee.lastName;
            urlData += '&FirstName=' + employee.firstName;
            urlData += '&PersonalMandatoryIdentificationNumber=' + employee.personalMandatoryIdentificationNumber;
            urlData += '&Gender=' + employee.gender;
            urlData += '&Married=' + employee.married;
            urlData += '&ParentsName=' + employee.parentsName;
            urlData += '&Nationality=' + employee.nationality;
            urlData += '&BirthTownId=' + employee.birthTownId;
            urlData += '&BirthDate=' + employee.birthDate;
            urlData += '&TaxFreeFactor=' + employee.taxFreeFactor;
            urlData += '&PersonalCardIssuedTown=' + employee.personalCardIssuedTown;
            urlData += '&PersonalCardId=' + employee.personalCardId;
            urlData += '&PersonalCardValidityDate=' + employee.personalCardValidityDate;
            urlData += '&CompanyId=' + employee.companyId;
            if (employee.id != null && employee.id != "undefined")
                urlData += '&id=' + employee.id ;
            if (employee.maidenName != null && employee.maidenName != "undefined" && employee.maidenName != "")
                urlData += '&MaidenName=' + employee.maidenName;
            if (employee.personalOptionalIdentificationNumber != null && employee.personalOptionalIdentificationNumber != "undefined")
                urlData += '&personalOptionalIdentificationNumber=' + employee.personalOptionalIdentificationNumber;
            if (employee.disabilityPercentage != null && employee.disabilityPercentage != "undefined")
                urlData += '&disabilityPercentage=' + employee.disabilityPercentage;
            if (employee.phoneNumber != null && employee.phoneNumber != "undefined")
                urlData += '&phoneNumber=' + employee.phoneNumber;
            if (employee.mobilePhoneNumber != null && employee.mobilePhoneNumber != "undefined")
                urlData += '&mobilePhoneNumber=' + employee.mobilePhoneNumber;
            if (employee.email != null && employee.email != "undefined")
                urlData += '&email=' + employee.email;
            if (employee.description != null && employee.description != "undefined")
                urlData += '&description=' + employee.description;
            if (employee.lastPayrollGrossAmount != null && employee.lastPayrollGrossAmount != "undefined")
                urlData += '&lastPayrollGrossAmount=' + employee.lastPayrollGrossAmount;
            if (employee.archiveNumber != null && employee.archiveNumber != "undefined")
                urlData += '&ArchiveNumber=' + employee.archiveNumber;
            if (employee.healthInsuranceNumber != null && employee.healthInsuranceNumber != "undefined")
                urlData += '&healthInsuranceNumber=' + employee.healthInsuranceNumber;
            if (employee.workPermitValidityDate != null && employee.workPermitValidityDate != "undefined")
                urlData += '&workPermitValidityDate=' + employee.workPermitValidityDate;
            if (employee.workPermitId != null && employee.workPermitId != "undefined")
                urlData += '&workPermitId=' + employee.workPermitId;
            if (employee.workPermitType != null && employee.workPermitType != "undefined")
                urlData += '&workPermitType=' + employee.workPermitType;

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/saveemployee', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;

        },

        getEmployees: function (companyId) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'employee/employee/list?companyId=' + companyId)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        saveSalaryAddition: function ( employeeId,salaryAddition) {
            var urlData = 'Amount=' + salaryAddition.amount;
            if (salaryAddition.id != null)
                urlData += '&id=' + salaryAddition.id;
            urlData += '&fromDate=' + salaryAddition.fromDate;
            if (salaryAddition.toDate != null && salaryAddition.currentAdditionFlag != "true")
                urlData += '&toDate=' + salaryAddition.toDate;
            urlData += '&employeeId=' + employeeId;
            urlData += '&BankAccountId=' + salaryAddition.salaryAdditionBankId;
            urlData += '&AdditionId=' + salaryAddition.salaryAdditionId;

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/SaveSalaryAddition', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        deleteSalaryAddition: function (id) {
            var urlData = 'Id=' + id;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/deleteSalaryAddition', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        saveSalarySuspension: function (employeeId, salarySuspension) {
            var urlData = 'Amount=' + salarySuspension.amount;
            if (salarySuspension.id != null)
                urlData += '&id=' + salarySuspension.id;
            urlData += '&fromDate=' + salarySuspension.fromDate;
            if (salarySuspension.toDate != null && salarySuspension.currentSuspensionFlag != "true")
                urlData += '&toDate=' + salarySuspension.toDate;
            urlData += '&employeeId=' + employeeId;
            urlData += '&BankAccountId=' + salarySuspension.salarySuspensionBankId;
            urlData += '&SuspensionId=' + salarySuspension.salarySuspensionId;

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/SaveSalarySuspension', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        deleteSalarySuspension: function (id) {
            var urlData = 'Id=' + id;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/deleteSalarySuspension', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        saveFeeFromSalary: function (employeeId, feeFromSalary) {
            var urlData = 'percentage=' + feeFromSalary.percentage;
            if (feeFromSalary.id != null)
                urlData += '&id=' + feeFromSalary.id;
            urlData += '&employeeId=' + employeeId;
            urlData += '&feeId=' + feeFromSalary.feeId;

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/SaveFeeFromSalary', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        deleteFeeFromSalary: function (id) {
            var urlData = 'Id=' + id;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/deleteFeeFromSalary', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        saveFeeToSalary: function (employeeId, feeToSalary) {
            var urlData = 'percentage=' + feeToSalary.percentage;
            if (feeToSalary.id != null)
                urlData += '&id=' + feeToSalary.id;
            urlData += '&employeeId=' + employeeId;
            urlData += '&feeId=' + feeToSalary.feeId;

            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/SaveFeeToSalary', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        deleteFeeToSalary: function (id) {
            var urlData = 'Id=' + id;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/deleteFeeToSalary', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        saveSalaryTax: function (employeeId, salaryTax) {
            var urlData = 'employeeId=' + employeeId;
            urlData += '&percentage=' + salaryTax.percentage;
            urlData += '&upperAmount=' + salaryTax.upperAmount;
            if (salaryTax.id != null)
                urlData += '&id=' + salaryTax.id;
            urlData += '&taxId=' + salaryTax.taxId;
            urlData += '&fromDate=' + salaryTax.fromDate;
            if (salaryTax.toDate != null && salaryTax.currentTaxFlag != "true")
                urlData += '&toDate=' + salaryTax.toDate;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/SaveSalaryTax', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        deleteSalaryTax: function (id) {
            var urlData = 'Id=' + id;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/deleteSalaryTax', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        saveWorkingHourFactor: function (employeeId, workingHourFactor) {
            var urlData = 'employeeId=' + employeeId;
            urlData += '&factor=' + workingHourFactor.factor;
            urlData += '&workingHourType=' + workingHourFactor.workingHourType;
            if (workingHourFactor.id != null)
                urlData += '&id=' + workingHourFactor.id;
            urlData += '&WorkingHourFactorId=' + workingHourFactor.factorId;
            urlData += '&fromDate=' + workingHourFactor.fromDate;
            if (workingHourFactor.toDate != null && workingHourFactor.currentWorkingHourFlag != "true")
                urlData += '&toDate=' + workingHourFactor.toDate;
            urlData += '&Active=true';
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/SaveWorkingHourFactor', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        deleteWorkingHourFactor: function (id) {
            var urlData = 'Id=' + id;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/deleteWorkingHourFactor', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        saveEducation: function (employeeId, education) {
            var urlData = 'employeeId=' + employeeId;
            if (education.id != null)
                urlData += '&id=' + education.id;
            urlData += '&EducationalInstitutionId=' + education.educationalInstitutionId;
            urlData += '&EducationalRankId=' + education.educationalRankId;
            urlData += '&fromDate=' + education.fromDate;
            if (education.toDate != null && education.currentEducationFlag != "true")
                urlData += '&toDate=' + education.toDate;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/SaveEducation', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        deleteEducation: function (id) {
            var urlData = 'Id=' + id;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'employee/employee/DeleteEducation', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },
    };
}]);