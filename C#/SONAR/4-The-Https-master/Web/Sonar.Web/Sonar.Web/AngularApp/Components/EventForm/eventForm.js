function eventForm() {
    return {
        templateUrl: "AngularApp/Components/EventForm/eventForm.html",
        scope: {
            model: "="
        },
        controller: eventFormController
    };
}


eventFormController.$inject = ["$scope"];
function eventFormController($scope) {
    $scope.eventTypes = [
        { name: "Neformalno", value: 1 },
        { name: "Rekreativno", value: 2 },
        { name: "Zabavno", value: 3 },
        { name: "Piknik", value: 4 },
        { name: "Edukativno", value: 5 },
        { name: "Kulturno", value: 6 },
        { name: "Ostalo", value: 7 },
    ];
};

sonar.directive('eventForm', eventForm);