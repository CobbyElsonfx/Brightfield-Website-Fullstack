const jwt = require("jsonwebtoken")


const requireAuth = (req,res,next) =>{
    const token = req.cookie.jwt
    if(token){
       const auth =  jwt.verify(token,"btn2022", (err,decodedToken)=>{
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


module.exports  = {
    requireAuth
}