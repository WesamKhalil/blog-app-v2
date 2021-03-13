const jwt = require('jsonwebtoken')
require("dotenv").config()

//Middleware for checking if users can create, edit or delete posts
const authPostActions = async (req, res, next) => {
    const token = req.header("x-auth-token")

    if(!token) res.sendStatus(401)

    try {
        const name = await jwt.verify(token, process.env.JWT_KEY)

        if(name !== req.body.name) throw new Error("You don't have authority on this post.")

        next()
    } catch(error) {
        res.sendStatus(401)
    }
}

module.exports = { authPostActions }