const jwt = require("jsonwebtoken")
const usermodel = require('../models/auth')

//require authentication before viewing page middlware
const requireAuth = async (req,res,next) =>{
    const token = req.cookies.jwt

    if(token){
       const auth = await jwt.verify(token,"btn2022", (err,decodedToken)=>{
        if(err){
            console.log(err.message)
            res.redirect("/user/login")
        }else{
            next()
        }
       })
       
    }else{ 
      res.redirect("/user/login")
    }

}


//check current user middleware

const checkUser = async (req,res,next) => {
    const token = req.cookies.jwt
    try {
        if(token){
            const auth = await jwt.verify(token,"btn2022", async (err,decodedToken)=>{
             if(err){
                res.locals.lastName= null
                res.locals.firstName= null
               next()
             }else{
                 const  user =  await usermodel.findById(decodedToken.id)
                 if(user == null){
                    next()
                 }
                 console.log(user)
                 res.locals.lastName = user.firstName
                 res.locals.firstName= user.lastName
                 next()
             }
            })      
         }else{ 
            res.locals.lastName= null
            res.locals.firstName= null
            next()
         }   
    } catch (error) {
        console.error(error)
    }
}

//check if the user is an admin
//if the login user is an admin, allow him to make post,delete post and edit post
const isAdmin = async (req,res,next) =>{
    const token = req.cookies.jwt

    if(token && req.user.isAdmin){
       const auth = await jwt.verify(token,"btn2022", async (err,decodedToken)=>{
        if(err){

            res.redirect("/user/login")
        }else{
            const  user =  await usermodel.findById(decodedToken.id)
                 if(user.isAdmin){
                    res.locals.lastName = user.firstName
                    res.locals.firstName= user.lastName
                    next()   
                 }
                 else{
                    next()
                 }               
        }
       })
       
    }else{ 
      res.redirect("/user/login")
    }

}






module.exports  = {
    requireAuth, 
    checkUser
}