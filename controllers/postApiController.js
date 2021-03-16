const Post = require('../models/Post')

const errorHandler = error => {
    let newError = { author: null, email: null, title: null, description: null, content: null, general: null }

    if(error._message === "post validation failed") {
        Object.keys(error.errors)
            .forEach(errorName => {
                const message = error.errors[errorName].message
                newError[errorName] = message
            })

        return { errorMessage: newError }
    } else if(error.kind === "ObjectId" || error.message === "Post doesn't exist.") {
        newError.general = "Post doesn't exist."
        return { errorMessage: newError }
    }
}

const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const startIndex = (page - 1) * limit
    try {
        const posts = await Post.find().sort({ createdAt: 'desc'}).skip(startIndex).limit(limit).exec()
        res.json({ posts })
    } catch(error) {
        res.sendStatus(400)
    }
}

const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post === null) throw new Error("Post doesn't exist.")
        res.json(post)
    } catch(error) {
        const formattedError = errorHandler(error)
        res.sendStatus(400)
    }
}

const createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body)
        res.json(newPost)
    } catch(error) {
        const formattedError = errorHandler(error)
        res.status(400).json(formattedError)
    }
}

const editPost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        if(post === null) throw new Error("Post doesn't exist.")
        res.json(post)
    } catch(error) {
        const formattedError = errorHandler(error)
        res.status(400).json(formattedError)
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