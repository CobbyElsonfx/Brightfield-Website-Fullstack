const usermodel = require('../models/auth')
const jwt = require("jsonwebtoken") 











//post controller
const logout_get = async (req,res)=>{
   try {
      res.cookie("jwt", "", {maxAge:1,httpOnly:true} )
      res.redirect("user/login")
   } catch (error) {
    console.log(error)
    }

}





module.exports =  {
   logout_get
}