var mongoose = require("mongoose")
var config = require("../config")

mongoose.Promise = global.Promise

module.exports = function() {

    var env = config.env
    console.log(env)

    mongoose.connect(config.getDBConnectionString)


    mongoose.connection.once("open", function() {

            console.log("Connection Established")
        })
        .on("error", function() {

            console.log("Error")
        })





}