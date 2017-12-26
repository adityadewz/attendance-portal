// node_modules
var express = require("express")
var app = express()
var socketIO = require("socket.io")
var http = require("http")
var path = require("path")
var bodyParser = require("body-parser")
var config = require("../config")
var port = config.port
var router = express.Router();

// imported modules
var User = require("../database/models/User")
var Attendance = require("../database/models/Attendance")
var mongoose = require("../database/mongooseConnection");
var routes = require("./routes")
var socketCon = require("./socketCon")
    // middleware
app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use("/api", router)

// variables || functions
var server = http.createServer(app)
var io = socketIO(server)
var teacherSocket;

console.log(config.env+" is running")

// switch (config.env) {
//     case "development":
//         app.use(express.static(path.join(__dirname, "../build")))

//     case "production":
//         app.use(express.static(path.join(__dirname, "../public")))

// }

mongoose();

routes(router);

socketCon(io, server)


server.listen(port, function() {
    console.log("listening on port 1300")
})