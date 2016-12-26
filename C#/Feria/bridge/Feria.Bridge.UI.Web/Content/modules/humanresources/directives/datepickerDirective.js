'use strict';
humanResourcesApp.directive('datepicker', ['$parse', function ($parse) {
    return function (scope, element, attrs) {
        element.datetimepicker({
            format: attrs.dateFormat
        }).on("dp.change", function (e) {
            $parse(attrs.varName).assign(scope, moment(e.date.valueOf()).format('YYYY-MM-DD hh:mm:ss'));
            scope.$apply();
        });
    }
}]);

humanResourcesApp.directive('dateValid',['$parse', function ($parse) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            scope.$watch(attrs.varName, function (value) {
                if (value) {
                    scope.validation[attrs.valid]= true;

                } else {
                    scope.validation[attrs.valid]=false;
                }
            });
        }
    };
}]);
