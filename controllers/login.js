const usermodel = require('../models/auth')
const jwt = require("jsonwebtoken") 
const bcrypt = require("bcrypt")


const handleError = (err)=>{

   let errors = { email: '', password: '' };
  // incorrect email
  if (err.message === "Email not registered") {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'Invalid Password') {
    errors.password = 'That password is incorrect';
  }

  

  // validation errors
  if (err.message.includes('user validation failed')) {
    console.log(err,"here is the err");
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties, "here is the properties");
      errors[properties.path] = properties.message;
    });
  }

  return errors
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
    console.log(newUser)
    if(newUser){
      const token = createToken(newUser._id)
      res.cookie("jwt", token, {maxAge:2*24*60*60*1000,httpOnly:true} )
      res.status(200).json({user:newUser._id}) 
    }
    
   } catch (error) {
    const errors = handleError(error)
    res.status(400).json({errors})
   }

}





module.exports =  {
   login_get,
   login_post
}