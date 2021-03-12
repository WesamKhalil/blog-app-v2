const Article = require('../models/Article')
const User = require('../models/User')

const getPosts = async (req, res) => {
    try {
        const articles = Article.find().sort({createdAt: "desc"})
        res.json({articles})
    } catch(error) {
        res.sendStatus(400)
    }
}

const createPost = async (req, res) => {
    try {
        const newPost = await Article.create(req.body)
        res.json(newPost)
    } catch(error) {
        res.sendStatus(400)
    }
}

const getSinglePost = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
        if(article === null) throw new Error("Article doesn't exist.")
        res.json(user)
    } catch(error) {
        res.sendStatus(400)
    }
}

const editPost = async (req, res) => {
    try {
        await Article.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        if(article === null) throw new Error("Article doesn't exist.")
        res.sendStatus(200)
    } catch(error) {
        res.sendStatus(400)
    }
}

const deletePost = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id)
        res.sendStatus(200)
    } catch(error) {
        res.sendStatus(400)
    }
}

module.exports = { getPosts, createPost, getSinglePost, editPost, deletePost }