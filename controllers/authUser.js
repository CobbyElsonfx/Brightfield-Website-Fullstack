var usermodel = require('../models/auth')



const sigup_get = (res,req)=>{
   res.render('singup')
}


const signup_post = (res,req)=>{
   const {password , email}  = req.body
    
   const newUser = usermodel.create({password,email})
   res.send("sign up post ")
}



//login controllers 
const login_get = (res,req)=>{
   res.send("login get controller ")
}

const login_post = (res,req)=>{
   res.send("login post controller ")
}




module.exports =  {
   signup_post,
   sigup_get, 
   login_get,
   login_post
}