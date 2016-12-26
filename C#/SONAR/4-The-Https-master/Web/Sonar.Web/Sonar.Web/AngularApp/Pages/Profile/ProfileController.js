ProfileController.$inject = ["$scope", "$http", "$routeParams"];
function ProfileController($scope, $http, $routeParams) {
    var userId = $routeParams.id || 14;

    $scope.isUpdating = function (setValue) {
        return (setValue == true) ? setValue : false;
    }

    var setOtherFields = function () {
        $scope.profileViewModel.Id = userId;
        $scope.profileViewModel.PersonTypeId = 3; // private account
        $scope.profileViewModel.Rating = 7;
        if ($scope.profileViewModel.Password == "" || $scope.profileViewModel.Password == undefined) {
            $scope.profileViewModel.Password = "1234";
        }
        $scope.profileViewModel.PersonType = "Privatni";
        /*
        if ($scope.profileViewModel.Id == 0 || $scope.profileViewModel.Id == undefined) {
            $scope.profileViewModel.Id = 14;
        }
        if ($scope.profileViewModel.PersonTypeId = 0 || $scope.profileViewModel.PersonTypeId == undefined) {
            $scope.profileViewModel.PersonTypeId = 3; // private account
        }
        if ($scope.profileViewModel.Rating == 0 || $scope.profileViewModel.Rating == undefined) {
            $scope.profileViewModel.Rating = 7;
        }
        if ($scope.profileViewModel.Password == "" || $scope.profileViewModel.Password == undefined) {
            $scope.profileViewModel.Password = "1234";
        }
        if ($scope.profileViewModel.PersonType == "" || $scope.profileViewModel.PersonType == undefined) {
            $scope.profileViewModel.PersonType = "Privatni";
        }*/
    }

    $scope.updateProfile = function () {
        $scope.isUpdating(true);

        setOtherFields();

        $http.post('Api/ProfileApi/Update/', $scope.profileViewModel).then(function () {
            $scope.updateProfileMessage = "Successfully updated profile data...";
            $scope.isUpdating(false);
        });
    }

    //$http.get('Api/ProfileApi/GetProfile/', { id: 0 }).then(function (response) {
    
    $http.get('Api/ProfileApi/Get/', { params: { id: userId } }).then(function (response) {
        $scope.profileViewModel = response.data;
        setOtherFields();
    });

    if ($scope.isUpdating) {

    }
}

sonar.controller('profileController', ProfileController);