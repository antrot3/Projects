loginController.$inject = ['$scope', '$http', '$location'];
function loginController($scope, $http, $location) {

    $scope.credentials = {
        username: '',
        password: ''
    };

    personData = {};

    $http.get('/Api/ProfileApi/GetByUsername/', $scope.credentials.username).then(function (response) {
        personData = response.data;
    });

    $scope.login = function () {
        if (personData != null && $scope.credentials.username != "" && $scope.credentials.password != "") {
            localStorage.setItem("username", $scope.credentials.username);
            localStorage.setItem("password", $scope.credentials.password);
            $location.path('/#/profile');
            $location.replace();
        }
    }
}

sonar.controller('loginController', loginController);