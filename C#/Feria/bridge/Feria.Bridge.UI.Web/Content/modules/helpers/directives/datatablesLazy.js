'use strict';

helpersApp.directive('datatablesLazy', ['$compile', function ($compile) {

    return {
        restrict: 'E',
        scope: {
            columns: '=',
            options: '=',
            footer: '=?'
        },
        link: function (scope, element) {
            scope.$watch('options', function (value) {
                if (value) {
                    var datatable = angular.element('<table datatable="" dt-options="options" dt-columns="columns" class="row-border hover">' + (scope.footer ? scope.footer : '') + '</table>');
                    element.html(datatable);

                    $compile(datatable)(scope);
                }
            });
        }
    };

}]);