const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Post = require('../models/Post')
require("dotenv").config()

//Confirm that the token sent by client belongs to an existing user
const authPost = async (req, res, next) => {
    const token = req.header("x-auth-token")

    if(!token) return res.sendStatus(401)

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_KEY)

        const user = await User.findById(decodedToken.id).select('email').lean()

        if(!user) throw new Error("User doesn't exist.")

        req.userEmail = user.email

        next()
    } catch(error) {
        res.sendStatus(401)
    }
}

//Middleware for checking if confirmed user can mutate requested document/post
const authPostMutate = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).select('email').lean()

        if(req.userEmail !== post.email) throw new Error("You don't have authority on this post.")

        next()
    } catch(error) {
        res.sendStatus(401)
    }
}

module.exports = { authPost, authPostMutate }