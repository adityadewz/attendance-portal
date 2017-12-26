var _ = require("underscore")

var User = require("../../database/models/User")
var Attendance = require("../../database/models/Attendance")

module.exports = function(router)

{
    router.post("/users", function(req, res) {

        var newUser = _.pick(req.body, "email", "password","userBranch","class","rollNo","userType","name")


        var user = new User(newUser)

        user.save().then(function(user) {
                console.log(user)
                return user.generateAuthToken().then(function(token) {
                res.header('x-auth', token).send(user)

            })
            .catch(function(err) {
                res.send("error!")
            })
            })
    })

    router.post("/login", function(req, res) {

        var newUser = _.pick(req.body, "email", "password")

        User.findByCredentials(newUser).then(function(user)
        {
            console.log(user)

        	user.generateAuthToken().then(function(token) {
                res.header('x-auth', token).send(user) //to do
            })
            .catch(function(e) {
                res.send(e)
            })
        })
        .catch(function(e)
        {
        	res.send(e)
        })
    })


    router.post("/attendance", function(req, res) {
        var body = _.pick(req.body, "teacherId","Tclass","Tbranch","Tsubject")
        console.log(req.body)
        Attendance.find({
                Tsubject: body.Tsubject,
                Tclass: body.Tclass,
                Tbranch: body.Tbranch,
                teacher: body.teacherId.toString()

            })
            .populate("user")
            .then(function(response) {
                res.send(response)
            })
            .catch(function(err) {
                res.send(err)
            })

    })


}