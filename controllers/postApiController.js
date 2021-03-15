const Post = require('../models/Post')

const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const startIndex = (page - 1) * limit
    try {
        const posts = await Post.find().sort({ createdAt: 'desc'}).skip(startIndex).limit(limit).exec()
        res.json({ posts })
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post === null) throw new Error("Post doesn't exist.")
        res.json(post)
    } catch(error) {
        res.sendStatus(400)
    }
}

const createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body)
        res.json(newPost)
    } catch(error) {
        res.sendStatus(400)
    }
}

const editPost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        if(post === null) throw new Error("Post doesn't exist.")
        res.json(post)
    } catch(error) {
        res.sendStatus(400)
    }
}

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.sendStatus(200)
    } catch(error) {
        res.sendStatus(400)
    }
}

module.exports = { getPosts, getSinglePost, createPost, editPost, deletePost }