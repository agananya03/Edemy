import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'

const app = express()

await connectDB();

app.use(cors())

app.get('/', (req, res) => res.send("API Working"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})