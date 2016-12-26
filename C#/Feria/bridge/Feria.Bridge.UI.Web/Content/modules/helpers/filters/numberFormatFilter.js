'use strict';

helpersApp.filter('numberFormat',  ['$filter', function ($filter) {

    return function(input, decPlaces, thouSep, decSep) {
        decPlaces = decPlaces || 2;
        thouSep = thouSep || ".";
        decSep = decSep || ",";

        var out = isNaN(input) || input === '' || input === null ? 0.0 : input;

        var minus = input < 0;
        out = Math.abs(out);
        out = $filter('number')(out, decPlaces);

        if (thouSep != ",")
            out = out.replace(/\,/g, "T");
        if (decSep != ".")
            out = out.replace(/\./g, "D");

        out = out.replace(/T/g, thouSep);
        out = out.replace(/D/g, decSep);

        if (minus)
            return "-" + out;
        else
            return out;
    }; 

}]);