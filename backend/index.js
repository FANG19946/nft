import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/posts', postRoutes)


app.get('/', (req, res) => {
    res.send('Graffiti API running')
})

app.listen(5000, () => {
    console.log('Server running on port 5000')
})