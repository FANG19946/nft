import express from 'express'
import Post from '../models/Post.js'

const router = express.Router()

// GET all posts
router.get('/', async (req, res) => {
    const posts = await Post.find()
    res.json(posts)
})

// CREATE post
router.post('/', async (req, res) => {
    const post = new Post(req.body)
    await post.save()
    res.json(post)
})

export default router