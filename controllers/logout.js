const usermodel = require('../models/auth')
const jwt = require("jsonwebtoken") 











//post controller
const logout_get = async (req,res)=>{
   try {
      const token = createToken(newUser._id)
      res.cookie("jwt", "", {maxAge:1,httpOnly:true} )
      res.redirect("/login")
   } catch (error) {
    console.log(error)
    }

}





module.exports =  {
   logout_get
}