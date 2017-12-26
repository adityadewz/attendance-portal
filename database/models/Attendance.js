var mongoose = require("mongoose")

var Schema = mongoose.Schema

var AttendanceSchema = new Schema({

    Tsubject: String,
    Tclass:String,
    Tbranch:String,
    present: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    teacher:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    date:Date

})


var Attendance = mongoose.model("attendance", AttendanceSchema)

// var attendance=new Attendance({
// 	subject:"Physics",
// 	present:0,
// 	student:"58e68365deec9ada1110ded1"
// })

// attendance.save()
// .then(function(obj)
// {
// 	console.log(obj)
// })

module.exports = Attendance;