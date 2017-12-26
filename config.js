var connectionString;

switch (process.env.NODE_ENV) {
    case "production":
        connectionString = "mongodb://adityadewz:Aditya12!09@ds157380.mlab.com:57380/attendanceportal"
        break;

    default:
        connectionString = "mongodb://localhost/attendancePortal"
        break;

}
var client = "./public"
var temp = "./temp"

module.exports = {
    getDBConnectionString: connectionString,
    port: process.env.PORT || 1300,
    env: process.env.NODE_ENV || "development",
    secret: "abc123",
    key: "ilovemysimranjaan",
    timerLimit: 15, // in seconds,
    random: Math.floor(Math.random() * 100000),
    gulp: {
        js: [client + "/app/**/*.js"],
        css: [client + "/css/**/*.css"],
        img: [client + "/img/**/*.*"],
        html: [client + "/templates/**/*.html"],
        appJs: [temp + "/app/app.js", temp + "/app/services/*.js", temp + "/app/controller/*.js"],
        build: "./build",
        temp: temp,
        client: client
    }

}