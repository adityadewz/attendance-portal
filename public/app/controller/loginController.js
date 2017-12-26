(function(app) {

    app.controller("loginController",["$scope", "$http", "$state", "$sessionStorage", "dataService", "$state",loginCtrl] )

    function loginCtrl($scope, $http, $state, $sessionStorage, dataService, $state) {


        console.log("login controller")

        // $scope.newUser.userType = "S"
        // $scope.newUser.userBranch = "CSE"


        $scope.toggle = function() {
            console.log("hello")
            $('form').animate({
                height: "toggle",
                opacity: "toggle"
            }, "slow");
        }

        $scope.login = function(user) {

            console.log("logging in")

            dataService.userLogin(user)
                .then(function(res) {
                    toastr.success("Logged in")
                    $sessionStorage.user = res.data

                    console.log(res.data)

                    var type = res.data.type

                    $state.go("home")
                })
                .catch(function(e) {
                    toastr.error("Please enter valid credentials")
                    console.log(e)
                })

        }

        $scope.createAccount = function(user) {

            console.log(user)

            user.rollNo = Number(user.rollNo)

            dataService.createAccount(user)
                .then(function(res) {

                    toastr.success("Account created")

                    $sessionStorage.user = res.data

                    var type = res.data.type


                    $state.go("home")

                })
                .catch(function(e) {
                    toastr.error("Please enter valid credentials")
                    console.log(e)
                })

        }


    }


}(angular.module("myApp")))

