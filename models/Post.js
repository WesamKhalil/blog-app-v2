const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, "Please login or register to make a post."]
    },
    title: {
        type: String,
        required: [true, "Please provide a title."],
        maxLength: [60, "Title can't be more than 60 characters."]
    },
    description: {
        type: String,
        required: [true, "Please provide a description."],
        maxLength: [100, "Description can't be more than 100 characters."]
    },
    content: {
        type: String,
        required: [true, "Please provide content for the post."],
        maxLength: [2000, "Content can't be more than 2000 characters."]
    },
    userPostsId: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('post', postSchema)