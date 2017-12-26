(function(app) {

    app.controller("homeController", ["$scope", "$http", "$state", "$sessionStorage", homeCtrl])

    function homeCtrl($scope, $http, $state, $sessionStorage) {

        $scope.user = $sessionStorage.user

        console.log("home controller")

        var userType = $scope.user.userType


        if (userType === "S") {
            $state.go("home.student")
        }
        if (userType === "T") {
            $state.go("home.teacher")
        }



        $scope.logout = function() {

            delete $sessionStorage.user;
            $state.go("login");
        };


    }


}(angular.module("myApp")))


