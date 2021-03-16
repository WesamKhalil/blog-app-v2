const User = require('../models/User')
const jwt = require('jsonwebtoken')
const e = require('express')
require("dotenv").config()

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
        const formattedError = errorHandler(error)
        res.status(401).json(formattedError)
    }
}

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