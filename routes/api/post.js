const express = require("express")
const router = express.Router()
const { getPosts, getSinglePost, createPost, editPost, deletePost } = require("../../controllers/postApiController")
const { authPost, authPostMutate } = require('../../middleware/authMiddleware')

router.get("/", getPosts)

router.get("/single/:id", getSinglePost)

router.post("/add", authPost,  createPost)

router.put("/edit/:id", authPost, authPostMutate, editPost)

router.delete("/delete/:id", authPost, authPostMutate, deletePost)

module.exports = router