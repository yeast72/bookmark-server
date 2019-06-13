const express = require('express')

const router = express.Router()

const bookmarkController = require('../controller/bookmark')

router.get('/bookmarks', bookmarkController.getBooks)

router.get('/', bookmarkController.getFolders)

router.post('/bookmark', bookmarkController.addBook)

router.delete('/bookmark/:bookId', bookmarkController.deleteBook)

module.exports = router