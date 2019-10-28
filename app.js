require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./routes/user')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database', process.env.DATABASE_URL))

app.use(express.json())

app.use('/users', userRouter)

const port = process.env.PORT || 8081
app.listen(port, () => console.log('Server started PORT:%d', port))