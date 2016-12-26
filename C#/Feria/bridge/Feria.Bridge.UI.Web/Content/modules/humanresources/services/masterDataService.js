'use strict';

humanResourcesApp.factory('humanResourcesMasterDataService', ['$http', '$q', 'applicationSettings', function ($http, $q, applicationSettings) {

    return {

        getBanks: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/bank/list')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },
        
        getBank: function (id) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/bank/get?bankId=' + id)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },
  
       updateBank: function (bank) {

            var urlData = 'bankId=' + bank.id;
            urlData += '&name=' + bank.name;
            urlData += '&address=' + bank.address;
            if (bank.ibanprefix != null && bank.ibanprefix != "undefined")
                urlData += '&ibanprefix=' + bank.ibanprefix;
            if (bank.accountnumberprefix != null && bank.accountnumberprefix != "undefined")
                urlData += '&accountnumberprefix=' + bank.accountnumberprefix;
            if (bank.slipmodel != null && bank.slipmodel != "undefined")
                urlData += '&slipmodel=' + bank.slipmodel;
            if (bank.slipnumberofapproval != null && bank.slipnumberofapproval != "undefined")
                urlData += '&slipnumberofapproval=' + bank.slipnumberofapproval;
            if (bank.slipnumberofdebt != null && bank.slipnumberofdebt != "undefined")
            urlData += '&slipnumberofdebt=' + bank.slipnumberofdebt;
            
            
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/bank/update', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
       },

      deactivateBank: function (id) {

           var urlData = 'bankId=' + id;
           
            
           var deferred = $q.defer();
           $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/bank/deactivate', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
               .success(function (response) {
                   deferred.resolve(response);
               })
               .error(function (err, status) {
                   deferred.reject(err);
               });
           return deferred.promise;
      },
      getTown: function (id) {

          var deferred = $q.defer();
          $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/countiesandtowns/getTown?townId=' + id)
              .success(function (response) { deferred.resolve(response); })
              .error(function (err, status) { deferred.reject(err); });
          return deferred.promise;
      },
      getTowns: function () {

          var deferred = $q.defer();
          $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/countiesandtowns/getTownsList')
              .success(function (response) { deferred.resolve(response); })
              .error(function (err, status) { deferred.reject(err); });
          return deferred.promise;
      },
      getTownsFromCounties: function (id) {

          var deferred = $q.defer();
          $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/countiesandtowns/getTownsFromCountiesList?countyId=' + id)
              .success(function (response) { deferred.resolve(response); })
              .error(function (err, status) { deferred.reject(err); });
          return deferred.promise;
      },
      deactivateTown: function (id) {

          var urlData = 'townId=' + id;


          var deferred = $q.defer();
          $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/countiesandtowns/deactivateTown', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
              .success(function (response) {
                  deferred.resolve(response);
              })
              .error(function (err, status) {
                  deferred.reject(err);
              });
          return deferred.promise;
      },
      updateTown: function (town, id, selectedCountyId) {
          var urlData = 'name=' + town.name;
          if(town.id != null && town.id != 'undefined')
          urlData += '&townId=' + town.id;
          if (town.zipCode != null && town.zipCode != "undefined")
          urlData += '&zipCode=' + town.zipCode;
          urlData += '&CountryId=fb004a45-caf5-4e52-9e80-006118580744';
          if (town.selectedCountyId == null || town.selectedCountyId == 'undefined')
          {
              urlData += '&CountyId=' + town.countyId;
          }
          else
          {
              urlData += '&CountyId=' + town.selectedCountyId;
          }

          var deferred = $q.defer();
          $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/countiesandtowns/updateTown', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
              .success(function (response) {
                  deferred.resolve(response);
              })
              .error(function (err, status) {
                  deferred.reject(err);
              });
          return deferred.promise;
      },
      getCounty: function (id) {

          var deferred = $q.defer();
          $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/countiesandtowns/getCounty?countyId=' + id)
              .success(function (response) { deferred.resolve(response); })
              .error(function (err, status) { deferred.reject(err); });
          return deferred.promise;
      },
      getCounties: function () {

          var deferred = $q.defer();
          $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/countiesandtowns/getCountiesList')
              .success(function (response) { deferred.resolve(response); })
              .error(function (err, status) { deferred.reject(err); });
          return deferred.promise;
      },
      deactivateCounty: function (id) {

          var urlData = 'countyId=' + id;


          var deferred = $q.defer();
          $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/countiesandtowns/deactivateCounty', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
              .success(function (response) {
                  deferred.resolve(response);
              })
              .error(function (err, status) {
                  deferred.reject(err);
              });
          return deferred.promise;
      },
      updateCounty: function (county, id) {
          var urlData = 'name=' + county.name;
          if(county.id != null && county.id != 'undefined')
          urlData += '&countyId=' + county.id;
          urlData += '&code=' + county.code;
          urlData += '&taxpercentage=' + county.taxPercentage;
          urlData += '&CountryId=fb004a45-caf5-4e52-9e80-006118580744';

          var deferred = $q.defer();
          $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/countiesandtowns/updateCounty', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
              .success(function (response) {
                  deferred.resolve(response);
              })
              .error(function (err, status) {
                  deferred.reject(err);
              });
          return deferred.promise;
      },
      getCountries: function () {

          var deferred = $q.defer();
          $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/countiesandtowns/getCountriesList')
              .success(function (response) { deferred.resolve(response); })
              .error(function (err, status) { deferred.reject(err); });
          return deferred.promise;
      },

       getCompetences: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/competence/list')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getCompetence: function (competenceID) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/competence/get?Id='+competenceID)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        saveCompetence: function (competence) {
            var urlData = 'Name=' + competence.name;
            urlData += '&Description=' + competence.description;
            if (competence.Id != null)
                urlData += '&Id=' + competence.Id;
            if (competence.certification != null && competence.certification != "undefined")
                urlData += '&Certification=' + competence.certification;
            if (competence.institution != null && competence.institution != "undefined")
                urlData += '&Institution=' + competence.institution;
            if (competence.institutionAddress != null && competence.institutionAddress != "undefined")
                urlData += '&InstitutionAddress=' + competence.institutionAddress;
            urlData += '&Active=true';
            urlData += '&CompanyId=' + competence.companyId;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/competence/savecompetence', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        deleteCompetence: function (id) {
            var urlData = 'Id=' + id;
            
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/competence/deletecompetence',  urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        getEducationalInstitutions: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/educationalInstitution/list')
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getEducationalInstitution: function (id) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/educationalInstitution/get?educationalInstitutionId=' + id)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        updateEducationalInstitution: function (educationalInstitution) {

            var urlData = 'Name=' + educationalInstitution.name;                             
            if (educationalInstitution.id != null)
                urlData += '&EducationalInstitutionId=' + educationalInstitution.id;
            if (educationalInstitution.address != null && educationalInstitution.address!="undefined")
                urlData += '&Address=' + educationalInstitution.address;
            if (educationalInstitution.major != null && educationalInstitution.major != "undefined")
                urlData += '&Major=' + educationalInstitution.major;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/educationalInstitution/save', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },
     
        deactivateEducationalInstitution: function (id) {
            var urlData = 'EducationalInstitutionId=' + id;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/educationalInstitution/deactivate', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },
        
       getSalaryAdditions: function (companyId) {
            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/salaryaddition/list?CompanyId='+companyId)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
       },

       getSalaryAddition: function (id) {

           var deferred = $q.defer();
           $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/salaryaddition/getSalaryAddition?salaryAdditionId=' + id)
               .success(function (response) { deferred.resolve(response); })
               .error(function (err, status) { deferred.reject(err); });
           return deferred.promise;
       },

       getSalarySuspension: function (id) {

           var deferred = $q.defer();
           $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/salarysuspension/getSalarySuspension?salarySuspensionId=' + id)
               .success(function (response) { deferred.resolve(response); })
               .error(function (err, status) { deferred.reject(err); });
           return deferred.promise;
       },

       saveSalaryAddition: function (salaryAddition, id, newTaxable, defaultCompanyId, selectedAcquirerTypeId, selectedFirstLastInsuranceMonthTypeId, selectedTaxFreeReceiptTypeId) {
     
           if (salaryAddition.name != null && salaryAddition.name != 'undefined')
           var urlData = 'name=' + salaryAddition.name;
           if (salaryAddition.id != null && salaryAddition.id != 'undefined')
               urlData += '&salaryAdditionId=' + salaryAddition.id;
           if (salaryAddition.companyId == null || salaryAddition.companyId == 'undefined')
           {
               urlData += '&CompanyId=' + defaultCompanyId;
           }
           else
           {
               urlData += '&CompanyId=' + salaryAddition.companyId;
           }
           
           if (salaryAddition.selectedAcquirerTypeId == null || salaryAddition.selectedAcquirerTypeId == 'undefined') {
               urlData += '&JoppdAcquirerTypeId=' + salaryAddition.acquirerTypeId;
           }
           else {
               urlData += '&JoppdAcquirerTypeId=' + salaryAddition.selectedAcquirerTypeId;
           }
           if (salaryAddition.selectedFirstLastInsuranceMonthTypeId == null || salaryAddition.selectedFirstLastInsuranceMonthTypeId == 'undefined') {
               urlData += '&JoppdFirstLastInsuranceMonthTypeId=' + salaryAddition.firstLastInsuranceMonthTypeId;
           }
           else {
               urlData += '&JoppdFirstLastInsuranceMonthTypeId=' + salaryAddition.selectedFirstLastInsuranceMonthTypeId;
           }
           if (salaryAddition.selectedTaxFreeReceiptTypeId == null || salaryAddition.selectedTaxFreeReceiptTypeId == 'undefined') {
               urlData += '&JoppdTaxFreeReceiptTypeId=' + salaryAddition.taxFreeReceiptTypeId;
           }
           else {
               urlData += '&JoppdTaxFreeReceiptTypeId=' + salaryAddition.selectedTaxFreeReceiptTypeId;
           }
           
           if (salaryAddition.newTaxable == null || salaryAddition.newTaxable == 'undefined') {
               urlData += '&Taxable=' + salaryAddition.taxable;
           }
           else {
               urlData += '&Taxable=' + salaryAddition.newTaxable;
           }

           var deferred = $q.defer();
           $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/salaryaddition/saveSalaryAddition', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
               .success(function (response) {
                   deferred.resolve(response);
               })
               .error(function (err, status) {
                   deferred.reject(err);
               });
           return deferred.promise;
       },

       deactivateSalaryAddition: function (id) {
           var urlData = 'SalaryAdditionId=' + id;
           var deferred = $q.defer();
           $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/salaryaddition/deactivate', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
               .success(function (response) {
                   deferred.resolve(response);
               })
               .error(function (err, status) {
                   deferred.reject(err);
               });
           return deferred.promise;
       },

       deactivateSalarySuspension: function (id) {
           var urlData = 'SalarySuspensionId=' + id;
           var deferred = $q.defer();
           $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/salarysuspension/deactivate', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
               .success(function (response) {
                   deferred.resolve(response);
               })
               .error(function (err, status) {
                   deferred.reject(err);
               });
           return deferred.promise;
       },

       saveSalarySuspension: function (salarySuspension, id, newTaxable, defaultCompanyId) {
           if (salarySuspension.name != null && salarySuspension.name != 'undefined')
           var urlData = 'name=' + salarySuspension.name;
           if (salarySuspension.id != null && salarySuspension.id != 'undefined')
               urlData += '&salarySuspensionId=' + salarySuspension.id;
           if (salarySuspension.companyId == null || salarySuspension.companyId == 'undefined') {
               urlData += '&CompanyId=' + defaultCompanyId;
           }
           else {
               urlData += '&CompanyId=' + salarySuspension.companyId;
           }
         
           if (salarySuspension.newTaxable == null || salarySuspension.newTaxable == 'undefined') {
               urlData += '&Taxable=' + salarySuspension.taxable;
           }
           else {
               urlData += '&Taxable=' + salarySuspension.newTaxable;
           }

           var deferred = $q.defer();
           $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/salarysuspension/saveSalarySuspension', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
               .success(function (response) {
                   deferred.resolve(response);
               })
               .error(function (err, status) {
                   deferred.reject(err);
               });
           return deferred.promise;
       },

        getSalarySuspensions: function (companyId) {
            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/salarysuspension/list?CompanyId='+companyId)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        saveEducationalRank: function(educationalRank, id, category){

            var urlData = 'Name=' + educationalRank.name;
            if (educationalRank.id != null)
                urlData += '&EducationalRankId=' + educationalRank.id;
            if (educationalRank.category || educationalRank.category == 'undefined') {
                urlData += '&Category=' + educationalRank.category;
            } else {
                urlData += '&Category=' + educationalRank.category;
            }
            
            urlData += '&EducationalInstitutionId=' + id;

            console.log(urlData)
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/educationalRank/save', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
               .success(function (response) {
                   deferred.resolve(response);
               })
               .error(function (err, status) {
                   deferred.reject(err);
               });
            return deferred.promise;
        },       
        getEducationalRanksEnum: function () {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/educationalRank/getEducationalCategoryList') 
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },
        deactivateEducationalRank: function (id) {

            var urlData = 'EducationalRankId=' + id;
            var deferred = $q.defer();
            $http.post(applicationSettings.humanResourcesAPIUrl + 'masterdata/educationalRank/deactivate', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        getEducationalRank: function (id) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/educationalRank/get?EducationalRankId=' + id) 
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getEducationalRanks: function (id) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'masterdata/educationalRank/list?EducationalInstitutionId=' + id) 
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getEmployees: function (companyId) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'employee/employee/list?companyId=' + companyId)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        },

        getEmployee: function (id) {

            var deferred = $q.defer();
            $http.get(applicationSettings.humanResourcesAPIUrl + 'employee/employee/get?employeeId=' + id)
                .success(function (response) { deferred.resolve(response); })
                .error(function (err, status) { deferred.reject(err); });
            return deferred.promise;
        }


    };
}]);