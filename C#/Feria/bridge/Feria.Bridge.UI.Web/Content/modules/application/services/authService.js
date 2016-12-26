'use strict';

bridgeWebApp.factory('authService', ['$http', '$q', 'applicationSettings', 'identityService', function ($http, $q, applicationSettings, identityService) {

    var signIn = function (data) {

        if (!data || !(data.username && data.password))
            return $q.reject(); 

        var urlData = 'grant_type=password';
        urlData += '&username=' + data.username;
        urlData += '&password=' + data.password;
        urlData += '&client_id=' + applicationSettings.applicationId;

        var deferred = $q.defer();

        $http.post(applicationSettings.authenticationAPIUrl + 'token', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            identityService.setIdentity(response); 
            deferred.resolve(response);

        }).error(function (error) {

            deferred.reject(error);
        });

        return deferred.promise;
    };

    var refresh = function () {

        var identity = identityService.getIdentity(); 
        if (!identity || !identity.refreshToken)
            return $q.reject();

        var urlData = 'grant_type=refresh_token';
        urlData += '&refresh_token=' + identity.refreshToken;
        urlData += '&client_id=' + applicationSettings.applicationId;

        var deferred = $q.defer();

        $http.post(applicationSettings.authenticationAPIUrl + 'token', urlData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            identityService.setIdentity(response);
            deferred.resolve(response);

        }).error(function (error) {

            deferred.reject(error);
        });

        return deferred.promise;
    };

    var signOut = function () {

        identityService.unsetIdentity(); 
    };

    return {
        signIn: signIn,
        refresh: refresh, 
        signOut: signOut
    }; 
}]);