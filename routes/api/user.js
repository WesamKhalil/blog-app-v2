const express = require("express")
const router = express.Router()
const { loginUser, registerUser, loadUser } = require("../../controllers/userApiController")

router.post("/login", loginUser)

router.post("/register", registerUser)

router.post("/load", loadUser)

module.exports = router