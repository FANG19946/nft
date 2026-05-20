import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import { connectDB } from './config/db.js'

dotenv.config()

const app = express()
connectDB()


app.use(cors())
app.use(express.json())
app.use('/api/posts', postRoutes)
app.use('/api', commentRoutes)


app.get('/', (req, res) => {
    res.send('Graffiti API running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})