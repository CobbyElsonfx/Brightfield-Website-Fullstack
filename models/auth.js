const mongoose = require("mongoose");
const {isEmail} = require("validator")
var bcrypt = require("bcrypt")

const userSchema  =  new mongoose.Schema({
    firstName : {
        type:String,
        required : true ,
        lowercase: true

    },
    lastName : {
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
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    },
    { timestamps: true },)

//hash password before it is save in db
//dont use an arrow function here
userSchema.pre("save", async function(next) {
 const salt = await bcrypt.genSalt()
 this.password = await bcrypt.hash(this.password,salt)
 next()
})



//static method to login  users
//We use a static method for authentication in this case because the method should be called on the model itself, rather than on an instance of the model. The reason for this 
//is that we need to query the database to find the user based on their email, and we want to keep this logic in the model layer.
userSchema.statics.login = async function(email, password){

    const user = await  this.findOne({email})  
    if(user){
     const auth = await bcrypt.compare(password, user.password) // auth becomes truthy so we can say if it succeds it comparing it do that ...
     if(auth){
        return user
     }{
        throw Error("Invalid Password")
     }
    }else{
        throw  Error("Email not registered")
    }
    

}


const User = mongoose.model("user", userSchema)
module.exports = User

