function sidebar() {
    return {
        templateUrl: "AngularApp/Components/Sidebar/sidebar.html",
        scope: {},
        controller: sidebarController
    }
}

sidebarController.$inject = ["$rootScope","$scope", "$http"];
function sidebarController($rootScope,$scope, $http) {
    $http.get('api/userApi/GetSidebarData/').then(function(response) {
        $scope.vm = response.data;
    });
};

sonar.directive('sidebar', sidebar);