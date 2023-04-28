const express = require("express")
const router = express.Router()
const signupControllers  = require("../controllers/signup")



const  signup  = router.route("/")
.get( signupControllers.signup_get)
.post( signupControllers.signup_post)


module.exports = router