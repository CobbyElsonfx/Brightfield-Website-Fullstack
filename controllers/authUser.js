var usermodel = require('../models/auth')
var jwt = require("jsonwebtoken") 



const handleError = (err)=>{
   console.log(err.message, err.code)
   const error = {email:"", password:""}

}

const createToken = (id)=>{
   return jwt.sign({id}, "btn2022" , {expiresIn: 2*24*60*60} )
}





const signup_get = (req,res)=> {
   res.render("signup")
}


const signup_post = async (req,res)=>{
   const {password , email}  = req.body
   try {
      const newUser = await usermodel.create({password,email})
      const token = createToken(newUser._id)
      res.cookie("jwt", token, {maxAge:2*24*60*60*1000,httpOnly:true} )
      res.status(200).json({user:newUser._id})      
   } catch (error) {
      const errors = handleError(error)
      console.error(errors)
      res.status(400).json({errors})
       
   }
}



//login controllers 
const login_get = (req,res)=>{
   res.send("login get controller ")
}

const login_post = (req,res)=>{
   res.send("login post controller ")
}




module.exports =  {
   signup_post,
   signup_get, 
   login_get,
   login_post
}