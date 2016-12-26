(function (angular, app) {

    config.$inject = ["$routeProvider"];
    function config($routeProvider) {

        $routeProvider
         .when('/', new AngularPage('main'))
         .when('/login', new AngularPage('login'))
          .when('/profile', new AngularPage('profile'))
          .when('/profile/:id', new AngularPage('profile'))
          .when('/friends', new AngularPage('friends'))
          .when('/events', new AngularPage('events'))
          .when('/index', new AngularPage('index'))
          .when('/eventNear', new AngularPage('eventNear'))
          .when('/newEvent', new AngularPage('newEvent'))
          .when('/hackathonCocaCola', new AngularPage('hackathonCocaCola'))
         .otherwise({ redirectTo: '/' });
    }

    function AngularPage(pageName) {
        this.templateUrl = 'AngularApp/Pages/' + pageName + '/' + pageName + '.html';
        this.controller = pageName + "Controller";
    }

    app.config(config);
})(angular, sonar);