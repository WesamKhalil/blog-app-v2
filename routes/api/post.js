const express = require("express")
const router = express.Router()
const { getPosts, getSinglePost, createPost, editPost, deletePost } = require("../../controllers/postApiController")
const { authPost, authPostMutate } = require('../../middleware/authMiddleware')

//Route for getting multiple posts.
router.get("/", getPosts)

//Route for getting a single post.
router.get("/single/:id", getSinglePost)

//Route for adding a post.
router.post("/add", authPost,  createPost)

//Route for editing post.
router.put("/edit/:id", authPost, authPostMutate, editPost)

//Route for deleting post.
router.delete("/delete/:id", authPost, authPostMutate, deletePost)

module.exports = router