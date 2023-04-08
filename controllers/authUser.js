var usermodel = require('../models/auth')



const sigup_get = (req,res)=> {
   res.render("signup")
}


const signup_post = (req,res)=>{
   const {password , email}  = req.body
    
   const newUser = usermodel.create({password,email})
   res.send("sign up post ")
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
   sigup_get, 
   login_get,
   login_post
}