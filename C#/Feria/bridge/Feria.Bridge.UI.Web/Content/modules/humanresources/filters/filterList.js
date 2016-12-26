humanResourcesApp.filter('reverse', function () {
    return function (items) {
        if (!angular.isArray(items)) return items;
        return items.slice().reverse();
    };
});
humanResourcesApp.filter('boolFilter', ['localizationService', function (localizationService) {
    return function (item) {
        return (item == true || item == 'true') ? localizationService.getLabel('humanResources_employee_yes') : localizationService.getLabel('humanResources_employee_no')
    };
}]);