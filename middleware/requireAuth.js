const jwt = require("jsonwebtoken")
const usermodel = require('../models/auth')

//require authentication before viewing page middlware
const requireAuth = async (req,res,next) =>{
    const token = req.cookies.jwt
    if(token){
       const auth = await jwt.verify(token,"btn2022", (err,decodedToken)=>{
        if(err){
            console.log(err.message)
            res.redirect("/login")
        }else{
            next()
        }
       })
       
    }else{ 
      res.redirect("/login")
    }

}


//check current user middleware

const checkUser = async (req,res,next) => {
    const token = req.cookies.jwt
    try {
        if(token){
            const auth = await jwt.verify(token,"btn2022", async (err,decodedToken)=>{
             if(err){
                next()
                res.locals.user = null
             }else{
                 const  user =  await usermodel.findById(decodedToken.id)
                 res.locals.username= user.email
                 next()
             }
            })
            
         }else{ 
            res.locals.user = null
            next()
         }
        
    } catch (error) {
        console.error(error)
    }
}

module.exports  = {
    requireAuth, 
    checkUser
}