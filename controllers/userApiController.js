const User = require('../models/User')
const jwt = require('jsonwebtoken')
require("dotenv").config()


const createToken = id => {
    return jwt.sign({id}, process.env.JWT_KEY)
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.verify(email, password)
        const token = await createToken(user._id)
        res.json({ name: user.name, token })
    } catch(error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const registerUser = async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.create(req.body)
        const token = await createToken(user._id)
        res.json({ token })
    } catch(error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const loadUser = async (req, res) => {
    const token = req.header("x-auth-token")
    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findById(decodedToken.id)
        res.json({ name: user.name, email: user.email })
    } catch(error) {
        res.sendStatus(401)
    }
}

module.exports = { loginUser, registerUser, loadUser }