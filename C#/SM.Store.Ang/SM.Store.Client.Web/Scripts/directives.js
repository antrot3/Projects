'use strict'

angular.module('smApp.directives', function () {
})
.directive('optionsClass', function ($parse) {
    return {
        //require: ['select','option'],
        link: function (scope, elem, attrs) {
            if (elem[0].tagName == "SELECT")
            {
                //get the source for items array that populates the select.
                var optionsSourceStr = attrs.ngOptions.split(' ').pop(),

                //use $parse to get a function from options-class attribute.
                getOptionsClass = $parse(attrs.optionsClass);

                scope.$watch(optionsSourceStr, function (items) {
                    //when the options source changes loop through its items.
                    angular.forEach(items, function (item, index) {
                        //evaluate against the item to get a mapping object for classes.
                        var classes = getOptionsClass(item);

                        //get option by looking for appropriate index in value attribute.
                        //var option = elem.find('option[value=' + * + ']'); //Not work.
                        var option = elem.children()[index];

                        //loop through the key/value pairs in mapping object and conditinally apply classes.
                        //use Array.some for breaking loop after matching.
                        //classes.some(function (type, className) {});
                        //But need iterate all possible classes...
                        angular.forEach(classes, function (type, className) {
                            if ((type == "placeholder" && index == 0) ||
                                (type != "placeholder" && index > 0)) {
                                angular.element(option).addClass(className);
                            }
                        });
                    });
                });
            }
            else if (elem[0].tagName == "OPTION") {
                //Used if placeholder item is included in server data return.
                getOptionsClass = $parse(attrs.optionsClass);
                var classes = getOptionsClass();
                angular.forEach(classes, function (type, className) {
                    if ((type == "placeholder" && elem[0].parentElement.children.length == 1) ||
                        (type != "placeholder" && elem[0].parentElement.children.length > 1)) {
                        angular.element(elem).addClass(className);
                    }
                });
            } 
        }
    };
})
;
