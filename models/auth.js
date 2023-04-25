const mongoose = require("mongoose");
const {isEmail} = require("validator")
var bcrypt = require("bcrypt")

const userSchema  =  new mongoose.Schema({
    email : {
        type:String,
        required : true ,
        unique:[true,"Email already exist" ],
        lowercase: true,
        validate: [isEmail, "Invalid Email"]

    },
    password : {   
        type:String,
        minLength :[6, "Password must be more than Six characters"],
        required:true
    },
    },
    { timestamps: true },)

//hash password before it is save in db
//dont use an arrow function here
userSchema.pre("save", async function(next) {
 const salt = await bcrypt.genSalt(10)
 this.password = await bcrypt.hash(this.password,salt)
 next()
})






const User = mongoose.model("user", userSchema)
module.exports = User

