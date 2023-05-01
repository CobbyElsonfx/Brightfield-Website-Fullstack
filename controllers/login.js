const usermodel = require('../models/auth')
const jwt = require("jsonwebtoken") 
const bcrypt = require("bcrypt")


const handleError = (err)=>{
   console.log(err.message, err.code)
   const error = {email:"", password:""}
  if(err.message.includes("user validation failed")){
   Object.values(err.errors).forEach(({properties})=> {
      error[properties.path] = properties.message
   } )

  }
   

   if(err.password == "Invalid Password"){
      error.password = "Password is Invalid"
   }

   if(err.email == "Email not registered"){
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
    const newUser = await usermodel.login(email,password) 
    if(newUser){
      const token = createToken(newUser._id)
      res.cookie("jwt", token, {maxAge:2*24*60*60*1000,httpOnly:true} )
      res.status(200).json({user:newUser._id}) 
    }
    
   } catch (error) {
    const errors = handleError(error)
    res.status(400).json({error:errors})
   }

}





module.exports =  {
   login_get,
   login_post
}