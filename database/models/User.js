var mongoose = require("mongoose")
var bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")
var Schema = mongoose.Schema
var config = require("../../config")

// schema 
var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    name: String,
    userType:{
        type: String,
        require: true
    },
    rollNo: Number,
    userBranch: String,
    class: String,
    year:Number,
    attendance: [{
        type: Schema.Types.ObjectId,
        ref: "attendance"
    }],

    tokens: [{
        token: {
            type: String,
            required: true
        },
        access: {
            type: String,
            required: true
        }
    }]
})

UserSchema.pre('save', function(next) {
    var user = this;
    
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.methods.generateAuthToken = function() {
    var user = this
    var access = "auth"

    var token = jwt.sign({
        _id: user._id.toHexString(),
        access: access
    }, config.secret).toString()

    user.tokens.push({
        token: token,
        access: access
    })

    return user.save().then(function(user) {
            return token
        })
        .catch(function(e) {
            console.log(e)
        })
}

UserSchema.statics.findByCredentials = function(cred) {
    var User = this
    var email = cred.email;
    var password = cred.password;

    return User.findOne({
            email: email
        })
        .then(function(user) {
            console.log(user)
            if (!user) {
                return Promise.reject()
            } else {
                return new Promise(function(resolve, reject) {
                    bcrypt.compare(password, user.password, function(err, res) {
                        console.log(res + " result")
                        if (res) {
                            resolve(user)
                        } else {
                            reject()
                        }
                    })
                })
            }
        })
}
var User = mongoose.model("user", UserSchema)

module.exports = User;