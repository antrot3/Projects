(function (app) {
    var DetailsController = function ($scope, $routeParams, musicService) {
        var id = $routeParams.id;
        musicService
            .getById(id)
            .then(function (res) {
                $scope.music = res.data;
            });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("theMusic")));