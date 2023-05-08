const usermodel = require("../models/auth")
const jwt = require("jsonwebtoken") 
const bodyParser = require('body-parser');


const handleError = (err)=>{
   // console.log(err.message , "here is it", err.code)
   const error = {email:"", password:""}
   if(err.message.includes("user validation failed")){
     Object.values(err.errors).forEach(({properties}) => {
       error[properties.path] = properties.message
    });
   }



   if(error.password == "Password must be more than Six characters"){
      error.password  = "Password must be more than Six Characters"
   }
   if(error.email == "Invalid Email"){
      error.email  = "Type a valid email"
   }
   if(err.code == 11000){
      error.email  = "Email already exist"

   }
   

   return error


}

const createToken = (id)=>{
   return jwt.sign({id}, "btn2022" , {expiresIn: 2*24*60*60} )
}





const signup_get = (req,res)=> {
   res.render("signup")
}




 
const signup_post = async (req,res)=>{
   const {password , email,firstName,lastName}  = req.body
   console.log(lastName,email,firstName,password , "from the controller in maths")
   try {
      const newUser = await usermodel.create({password,email,firstName,lastName})
      const token = createToken(newUser._id)
      res.cookie("jwt", token, {maxAge:2*24*60*60*1000,httpOnly:true} )
      res.status(200).json({user:newUser._id})      
   } catch (error) {
      const errors = handleError(error)
      res.status(400).json({error: errors})      
   }
}


module.exports =  {
   signup_post,
   signup_get
}