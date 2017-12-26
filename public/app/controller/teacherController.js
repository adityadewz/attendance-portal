(function(app) {

    app.controller("teacherController", ["$scope", "$http", "$state", "$sessionStorage", "dataService", teacherCtrl])

    function teacherCtrl($scope, $http, $state, $sessionStorage, dataService) {

            $scope.students = [];
            $scope.showInstantTable = true

            $scope.user = $sessionStorage.user
            var user = $scope.user

            console.log($scope.user)

            $scope.getAttendance = function() // todo
                {
                    dataService.getAttendance({
                        body: {
                            teacherId: user._id,
                            Tclass: user.class,
                            Tbranch: user.Ubranch,
                            Tsubject: user.subject
                        }
                    }).then(function(res) {
                        console.log(res.data)
                        $scope.attendances = res.data
                        $scope.showInstantTable = false
                    })
                }

            var socket = io()

            socket.on("connect", function() {
                console.log("connected to server")

                $scope.attendance = function(obj) {
                    console.log(obj)
                    socket.emit("startAttendance", {
                        teacherId: $scope.user._id,
                        branch: user.Ubranch,
                        subject: obj.subject,
                        class: obj.class
                    }, function(err) {
                        console.log(err)
                    })
                }

                socket.on("entryDone", function(params, err) {
                    if (err) {
                        return console.log("Error")
                    }

                    $scope.$apply(function() {

                        $scope.students.push(params.user)
                        console.log($scope.students)

                    })


                })
            })

        }


}(angular.module("myApp")))




