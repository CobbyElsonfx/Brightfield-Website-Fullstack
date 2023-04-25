const express = require("express")
const router = express.Router()
const authControllers  = require("../controllers/authUser")



const  signup  = router.route("/")
.get(authControllers.signup_get)
.post(authControllers.signup_post)


module.exports = router