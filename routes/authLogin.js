const express = require("express")
const router = express.Router()
const authControllers  = require("../controllers/authUser")

//sign up routes 




const loginRoute = router.route("/")
.get(authControllers.login_get)
.post(authControllers.login_post)


module.exports = router