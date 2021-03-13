const express = require("express")
const router = express.Router()
const { getPosts, getSinglePost, createPost, editPost, deletePost } = require("../../controllers/postApiController")
const { authPostActions } = require('../../middleware/authMiddleware')

router.get("/all", authPostActions, getPosts)

router.get("/single/:id", authPostActions, getSinglePost)

router.post("/add", authPostActions,  createPost)

router.put("/edit/:id", authPostActions, editPost)

router.delete("/delete/:id", authPostActions, deletePost)

module.exports = router