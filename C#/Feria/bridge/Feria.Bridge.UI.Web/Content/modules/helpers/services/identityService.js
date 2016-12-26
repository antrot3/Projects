'use strict';

helpersApp.factory('identityService', ['localStorageService', function (localStorageService) {

    var identitySet = false;

    var identityData = {
        userName: '', 
        name: '', 
        localization: '', 
        defaultCompanyId: '',
        token: '',
        refreshToken: ''
    };

    var setIdentityData = function (data) {

        identityData.userName = data.userName;
        identityData.name = data.name;
        identityData.localization = data.localization;
        identityData.defaultCompanyId = data.defaultCompanyId;
        identityData.token = data.token;
        identityData.refreshToken = data.refreshToken;

        identitySet = true;
    }; 

    var setIdentity = function (data) {

        var identData = {
            userName: data.userName,
            name: data.name,
            localization: data.localization,
            defaultCompanyId: data.defaultCompanyId,
            token: data.access_token,
            refreshToken: data.refresh_token
        }; 

        localStorageService.set('identityData', identData);
        setIdentityData(identData);
    };

    var unsetIdentity = function () {

        localStorageService.remove('identityData');
        identitySet = false; 

    };

    var getIdentity = function () {

        if (identitySet)
            return identityData;

        var data = localStorageService.get('identityData');
        if (data) {
            setIdentityData(data);
            return identityData;
        }

        return null; 
    };

    return {
        setIdentity: setIdentity,
        unsetIdentity: unsetIdentity,
        getIdentity: getIdentity
    };

}]);