(function(app) {

    app.controller("studentController", ["$scope", "$http", "$state", "$sessionStorage", studentCtrl])

    function studentCtrl($scope, $http, $state, $sessionStorage) {


        $scope.user = $sessionStorage.user
        var user = $scope.user
        console.log($scope.user)
        var code;

        var socket = io();

        socket.on("connect", function() {
            console.log("connected to server")

            $scope.attendance = function(obj) {
                obj.subject = obj.subject;
                obj._id = user._id
                obj.code = code;
                obj.class = user.class;
                obj.branch = user.userBranch;
                console.log(obj)
                socket.emit("startEntry", obj, function(err) {

                    if (err) {
                        return console.log("Error")
                    } else {
                        console.log("No error")
                    }

                })
            }

            socket.on("startAttendance", function(params) {
                console.log("Start attendance")
                console.log("Starting timer")
                console.log("Code is: " + params.code)
                code = params.code
                var timerLimit = params.timerLimit
                console.log(params)
                $scope.$apply(function() {
                    closeTimer(timerLimit)
                    $scope.code = code

                })

            })

            socket.on("invalidEntry", function(params) {
                toastr.error("Invalid entry. Try again")
            })

        })


        function closeTimer(timerLimit) {
            $scope.count = 0;
            var timer = setInterval(function() {

                $scope.$apply(function() {
                    if ($scope.count < timerLimit) {
                        $scope.count = $scope.count + 1
                    } else {
                        clearInterval(timer);
                        socket.close()
                    }
                })
            }, 1000);
        }

    }

}(angular.module("myApp")))


