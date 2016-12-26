// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
var BlankCordovaApp5;
(function (BlankCordovaApp5) {
    "use strict";

    (function (Application) {
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;

        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        }

        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }

        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }
    })(BlankCordovaApp5.Application || (BlankCordovaApp5.Application = {}));
    var Application = BlankCordovaApp5.Application;

    window.onload = function () {
        Application.initialize();
    };
})(BlankCordovaApp5 || (BlankCordovaApp5 = {}));
//# sourceMappingURL=index.js.map
