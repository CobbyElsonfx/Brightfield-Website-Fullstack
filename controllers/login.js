const usermodel = require('../models/auth')
const jwt = require("jsonwebtoken") 
const bcrypt = require("bcrypt")


const handleError = (err)=>{
   console.log(err.message, err.code)
   const error = {email:"", password:""}
   if(err.message == "Invalid Password"){
      error.password = "Password is Invalid"
   }

   if(err.message == "Email not registered"){
      error.email = "Email not registerd"
   }

   
}




const createToken = (id)=>{
   return jwt.sign({id}, "btn2022" , {expiresIn: 2*24*60*60} )
}

//login controllers 
const login_get = (req,res)=>{
   res.render("login")
}



//post controller
const login_post = async (req,res)=>{
   const {password,email} = req.body

   try {
    const user = await usermodel.login(email,password) 
    if(user){
      const token = createToken(newUser._id)
      res.cookie("jwt", token, {maxAge:2*24*60*60*1000,httpOnly:true} )
      res.status(200).json({user:user._id}) 
    }
    
   } catch (error) {
    res.status(400).json({error: "Errors in your code"})
    console.error(error)
    handleError(error)
    
   }

}





module.exports =  {
   login_get,
   login_post
}