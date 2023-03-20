const mongoose = require("mongoose");

const userSchema  =  new mongoose.Schema({
    email : {
        type:String,
        required : true,
        maxLength : 20,
        trim: true
    },
    password : {
        type:String,
        minLength : 7,

    },
    

    
})


module.exports = mongoose.model("user", userSchema)

