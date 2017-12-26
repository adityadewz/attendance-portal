var getRoutes = require("./getRoutes")
var postRoutes = require("./postRoutes")



module.exports = function(app) {
    getRoutes(app);
    postRoutes(app);

}