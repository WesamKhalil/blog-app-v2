const express = require("express")
const router = express.Router()
const { getPosts, getSinglePost, createPost, editPost, deletePost } = require("../../controllers/postApiController")

router.get("/all", getPosts)

router.get("/single/:id", getSinglePost)

router.post("/newpost",  createPost)

router.put("/edit/:id", editPost)

router.delete("/delete/:id", deletePost)

module.exports = router