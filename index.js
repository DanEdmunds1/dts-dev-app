import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import router from './config/routes.js'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(express.json())

// allows same origin requests for search bar.
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST', // Add other methods as needed
  credentials: true,    // Enable credentials if your API uses cookies, sessions, or authentication
}))


app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`)
    next()
})

// Endpoints
app.use('/api', router)

app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
  })

async function startServer() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('Database connection established')
        app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))
    } catch (error) {
        console.log('Error establishing connection')
        console.log(error)
    }
}
startServer()