const express = require("express")
const router = express.Router()
const { loginUser, registerUser, loadUser } = require("../../controllers/userApiController")

//Route for logging in.
router.post("/login", loginUser)

//Route for  registering.
router.post("/register", registerUser)

//Route for user with valid user token to automatically login when they refresh.
router.post("/load", loadUser)

module.exports = router