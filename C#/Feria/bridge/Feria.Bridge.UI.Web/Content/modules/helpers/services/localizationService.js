'use strict';

helpersApp.factory('localizationService', ['localization', 'identityService', function (localization, identityService) {

    return {
        getLabel: function (key) {

            var language = window.navigator.userLanguage || window.navigator.language; 

            var identity = identityService.getIdentity();
            if (identity)
                language = identity.localization.toLowerCase();

            if (!_.contains(localization.supportedLocalizations, language))
                language = localization.defaultLocalization; 

            return localization.labels[language][key];
        }
    };

}]);