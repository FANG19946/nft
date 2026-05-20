import express from 'express'

import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

const router = express.Router()

// CREATE TOP-LEVEL COMMENT

router.post('/posts/:postId/comments', async (req, res) => {

    try {

        const { text } = req.body

        const comment = new Comment({

            postId: req.params.postId,
            parentComment: null,
            replyToComment: null,
            text,

        })

        await comment.save()

        await Post.findByIdAndUpdate(

            req.params.postId,

            {
                $push: {
                    comments: comment._id,
                },
            }

        )

        res.json(comment)

    } catch (err) {

        res.status(500).json({
            error: err.message,
        })
    }
})


// CREATE REPLY

router.post('/comments/:commentId/replies', async (req, res) => {

    try {

        const { text } = req.body

        const parent = await Comment.findById(
            req.params.commentId
        )

        if (!parent) {

            return res.status(404).json({
                error: 'Comment not found',
            })
        }

        const reply = new Comment({

            postId: parent.postId,
            parentComment:
                parent.parentComment || parent._id,
            replyToComment: parent._id,
            text,

        })

        await reply.save()

        res.json(reply)

    } catch (err) {

        res.status(500).json({
            error: err.message,
        })
    }
})


// GET COMMENTS FOR POST

router.get('/posts/:postId/comments', async (req, res) => {

    try {

        const comments = await Comment.find({

            postId: req.params.postId,

        }).sort({
            createdAt: 1,
        })

        res.json(comments)

    } catch (err) {

        res.status(500).json({
            error: err.message,
        })
    }
})

export default router