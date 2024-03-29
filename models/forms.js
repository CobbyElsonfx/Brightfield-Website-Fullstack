const mongoose = require("mongoose");

const formsSchema  =  new mongoose.Schema({
    firstName : {
        type:String,
        required : true,
        maxLength : 20,
        trim: true
    },
    middleName : {
        type:String,
        maxLength : 20,
        trim: true
    },
    lastName:{
        type:String,
        required : true,
        maxLength : 20,
        trim: true
    },
    age:{
        type:Number,
        required : true,
        min:10,

    },
    gender:{
        type:String,
        required : true,

    },
    email:{
        type:String,
        required : true,
        trim: true,
        unique:true,
    },
    
    phoneNumber:{
        type:Number,
        required : true,
        unique:true

    },
    message :{
        type:String,
        required: false,
        
    }

    
})


module.exports = mongoose.model("Person", formsSchema)

