const express = require('express')

const router = express.Router()

const bookmarkController = require('../controller/bookmark')

router.get('/bookmarks', bookmarkController.getBookmarks)

router.get('/bookmark/:bookmarkId', bookmarkController.getBookmark)

router.post('/bookmark', bookmarkController.createBookmark)

router.put('/bookmark/:bookmarkId', bookmarkController.updateBookmark)

router.delete('/bookmark/:bookmarkId', bookmarkController.deleteBookmark)

module.exports = router