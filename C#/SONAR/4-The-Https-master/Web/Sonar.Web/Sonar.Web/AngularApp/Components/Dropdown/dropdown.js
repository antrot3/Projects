function dropdown() {
    return {
        templateUrl: "AngularApp/Components/Dropdown/dropdown.html",
        scope: {
            model: "=",
            options: "="
        }
    };
}

sonar.directive('dropdown', dropdown);