const express = require("express")
const router = express.Router()
const loginControllers  = require("../controllers/login")

//sign up routes 




const loginRoute = router.route("/")
.get(loginControllers.login_get)
.post(loginControllers.login_post)


module.exports = router