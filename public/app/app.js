(function(app) {

    app.config(["$stateProvider", "$urlRouterProvider", myApp])

    function myApp($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "templates/home.html",
                controller: "homeController"
            })
            .state("home.teacher", {
                url: "/teacher",
                templateUrl: "templates/teacher.html",
                controller: "teacherController"

            })
            .state("home.student", {
                url: "/student",
                templateUrl: "templates/student.html",
                controller: "studentController"

            })
            .state("login", {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: "loginController"
            })


    }

}(angular.module("myApp", ["ui.router", "ngStorage"])))


