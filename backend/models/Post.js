import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    text: String,
    position: [Number],
    rotation: Number,
    color: String,
    font: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: Date
})

export default mongoose.model('Post', postSchema)