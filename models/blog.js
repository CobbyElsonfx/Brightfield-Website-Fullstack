const mongoose = require("mongoose");

const blogSchema  =  new mongoose.Schema({
    title : {
        type:String,
        required : true ,
        lowercase: true

    },
    body : {
        type:String,
        required : true ,
        lowercase: true 
    },
     
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
    }
    },
    { timestamps: true },)


    module.exports = mongoose.model("blog",blogSchema)