const mongoose = require("mongoose");
const {isEmail} = require("validator")

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
      
})





module.exports = mongoose.model("user", userSchema)

