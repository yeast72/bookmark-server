const express = require('express')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

const bookmarkRouter = require('./routes/bookmark')
const authRouter = require('./routes/auth')

const Folder = require('./model/folder')
const User = require('./model/user')
const Book = require('./model/book')


// const user = new User({
//     name: "Yeast",
//     email: "test@test.com",
//     password: "test1234",
//     bookmarks: []
// })
// user.save().then(user => {
//     console.log(user)
// }).catch(err => console.log(err))

// let user, book
// User.findById('5ce14afa29d5fc35e4414849').then(result => user = result).catch(err => console.log(err))
// Book.findById('5cde934b0fdb5b07ece479bf').then(result => {
//     book = result
//     console.log(book);
// }).catch(err => console.error(err))


// const folder = new Folder({
//     name: 'Web development',
// })

// folder.save().then(result => {
//     console.log(result)
//     folder.bookmarks.push(book)
//     return folder.save()
// }).then(fol => {
//     user.folders.push(folder)
//     return user.save()
// }).then(userDoc => {
//     console.log(userDoc)
// }).catch(err => {
//     console.log(err)
// })






app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS, GET, PUT, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(bookmarkRouter);
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