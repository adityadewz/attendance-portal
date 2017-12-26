var _ = require("underscore")

module.exports = function(router)

{
    router.get("/", function(req, res) {
        res.send("hello I am here")
    })



}