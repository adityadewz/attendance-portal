var User = require("../database/models/User")
var Attendance = require("../database/models/Attendance")
var config = require("../config")
var code;
var teacherId;
var key = config.key

var Tclass;
var Tsubject;
var Tbranch;

module.exports = function(io, server) {
    io.on("connection", function(socket) {
        console.log("Connected with the student")


        socket.on("startAttendance", function(params, callback) {
            // console.log(socket.id)
            random = config.random;
            code = random
            teacherId = params.teacherId;
            Tclass = params.class
            Tbranch = params.branch
            Tsubject = params.subject

            // console.log(params)
            setTimeout(function() {

                socket.disconnect(true)
                console.log("connection closed")

            }, config.timerLimit * 1000)

            teacherSocket = socket;

            socket.broadcast.emit("startAttendance", {
                code: code,
                Tbranch: Tbranch,
                Tclass: Tclass,
                Tsubject: Tsubject,
                timerLimit: config.timerLimit
            })
        })

        socket.on("startEntry", function(params, callback) {

            var userId = params._id
            var subject = params.subject

            // console.log(code)
            // console.log(params)
            // console.log(Tbranch)

            if (Tclass === params.class && Tbranch === params.branch && Tsubject === params.subject) {

                if (code === params.code) {
                    Attendance.findOneAndUpdate({
                            user: userId,
                            Tsubject: params.subject,
                            Tclass: params.class,
                            Tbranch: params.branch,
                            teacher: teacherId
                        }, {
                            $inc: {
                                present: 1
                            }
                        }, {
                            new: true
                        })
                        .populate("user")
                        .then(function(obj) {

                            // console.log(obj)

                            if (!obj) {

                                // console.log(params)

                                var newAttendance = new Attendance({
                                    Tsubject: params.subject,
                                    Tclass: params.class,
                                    Tbranch: params.branch,
                                    user: userId,
                                    teacher: teacherId,
                                    present: 1
                                })

                                newAttendance.save().then(function(obj1) {
                                    console.log(obj1)

                                    User.findById({
                                            _id: obj1.user.toString()
                                        })
                                        .then(function(newUser) {
                                            teacherSocket.emit("entryDone", {
                                                user: newUser
                                            });
                                            socket.disconnect(true)

                                        })

                                })

                            } else {
                                teacherSocket.emit("entryDone", {
                                    user: obj.user
                                });
                                socket.disconnect(true)

                            }

                        })
                        .catch(function(err) {
                            console.log(err)
                        })

                } else {
                    socket.emit("invalidEntry", {
                        message: "Invalid Entry"
                    })
                }

            }


        })

    })
}