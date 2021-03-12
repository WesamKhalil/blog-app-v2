const express = require("express")
const router = express.Router()
const { getPosts, getSinglePost, createPost, editPost, deletePost } = require("../../controllers/blogApiController")

router.get("/all", getPosts)

router.get("/single", getSinglePost)

router.post("/newpost",  createPost)

router.put("/edit/:id", editPost)

router.delete("/delete/:id", deletePost)

module.exports = router