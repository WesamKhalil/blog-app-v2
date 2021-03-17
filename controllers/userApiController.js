const User = require('../models/User')
const jwt = require('jsonwebtoken')
const e = require('express')
require("dotenv").config()

//Formats errors into desired object to send as json to the client.
const errorHandler = error => {
    let newError = { name: null, email: null, password: null, general: null }

    if(error._message === "user validation failed") {
        Object.keys(error.errors)
            .forEach(errorName => {
                const message = error.errors[errorName].message
                newError[errorName] = message
            })
    } else if(error.code === 11000) {
        newError.email = "Email already registered."
    } else if(error.name === "verify") {
        error.errors.forEach(({ message, type }) => { newError[type] = message })
    }
    return { errorMessage: newError }
}

//Function for creating tokens, here we can add extra parameters and it will change it for all tokens created with this function.
const createToken = id => {
    return jwt.sign({id}, process.env.JWT_KEY)
}

//Controller/Middleware for logging in user.
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.verify(email, password)
        const token = await createToken(user._id)
        res.json({ name: user.name, token })
    } catch(error) {
        const formattedError = errorHandler(error)
        res.status(401).json(formattedError)
    }
}

//Controller/Middleware for registering a user.
const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        const token = await createToken(user._id)
        res.json({ token })
    } catch(error) {
        const formattedError = errorHandler(error)
        res.status(400).json(formattedError)
    }
}

//Controller/Middleware for loading user name and email for client with valid user token, for when they restart the app.
const loadUser = async (req, res) => {
    const token = req.header("x-auth-token")
    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_KEY)
        const { name, email } = await User.findById(decodedToken.id).select('name email').lean()
        res.json({ name, email })
    } catch(error) {
        res.sendStatus(401)
    }
}

module.exports = { loginUser, registerUser, loadUser }