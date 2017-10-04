(function () {
    var app = angular.module("theMusic", ["ngRoute"], ["musicService"] );
    var config = function ($routeProvider) {
            $routeProvider
            .when("/list",
            { templateUrl:"list.html", controller: "MusicListController" })
            .when("/details/:id",
            { templateUrl: "details.html", controller: "DetailsController" })
            .otherwise(
            { redirectTo: "/list", controller: "MusicListController" });
    };

    app.config(config);
    app.constant("musicApiUrl", "/api/musics/")
}()); 