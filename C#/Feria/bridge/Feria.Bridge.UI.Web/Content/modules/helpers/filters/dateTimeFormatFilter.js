'use strict';

helpersApp.filter('dateTimeFormat', function () {

    return function (input, includeTime) {
        input = new Date(input); 
        includeTime = includeTime || false;

        var year = input.getFullYear();
        var month = input.getMonth() + 1; 
        var day = input.getDate();
        var hours = input.getHours(); 
        var minutes = input.getMinutes();
        var seconds = input.getSeconds();

        var date = day.pad(2) + '.' + month.pad(2) + '.' + year;
        if (includeTime)
            date += ' ' + hours.pad(2) + ':' + minutes.pad(2) + ':' + seconds.pad(2);

        return date; 
    };

});