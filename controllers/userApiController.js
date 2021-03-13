const User = require('../models/User')
const jwt = require('jsonwebtoken')
require("dotenv").config()

//It would be more secure to sign a user id then check if that user exists on the database
//but for convenience sake I'll be signing the name for quicker access to the name value
const createToken = name => {
    return jwt.sign({name}, process.env.JWT_KEY)
}

const loginUser = async (req, res) => {
    try {
        const user = await User.verify(req.body)
        const token = await createToken(user.name)
        res.json({ name: user.name, token })
    } catch(error) {
        res.sendStatus(400)
    }
}

const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        const token = await createToken(user.name)
        res.json({ token })
    } catch(error) {
        res.sendStatus(400)
    }
}

module.exports = { loginUser, registerUser }