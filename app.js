const express = require('express')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

const bookmarkRouter = require('./routes/bookmark')
const authRouter = require('./routes/auth')
const folderRouter = require('./routes/folder')
const userRouter = require('./routes/user')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS, GET, PUT, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(bookmarkRouter);
app.use(folderRouter)
app.use(userRouter)
app.use('/auth', authRouter);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({
        message: message
    })
})

mongoose.connect('mongodb+srv://wsr:1234@node-couse-tgrvm.mongodb.net/bookmark').then(result => {
        app.listen(8000)
    })
    .catch(err => console.log(err))