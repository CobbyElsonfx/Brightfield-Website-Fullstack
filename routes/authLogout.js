const express = require("express")
const router = express.Router()
const logoutControllers  = require("../controllers/logout")

//sign up routes 




const loginRoute = router.route("/")
.get(logoutControllers.logout_get )


module.exports = router