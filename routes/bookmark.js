const express = require('express')
const {
    check
} = require('express-validator/check');

const router = express.Router()

const bookmarkController = require('../controller/bookmark')

router.get('/bookmarks', bookmarkController.getBookmarks)

router.get('/bookmark/:bookmarkId', bookmarkController.getBookmark)

router.post('/bookmark', [
    check('bookmark.title').exists().escape(),
    check('bookmark.url').exists().escape().isURL()
], bookmarkController.createBookmark)

router.put('/bookmark/:bookmarkId', [
        check('bookmark.title').exists().escape(),
        check('bookmark.url').exists().escape().isURL(),
        check('bookmark.completed').exists().isBoolean().toBoolean(),
        check('bookmark.stared').exists().isBoolean().toBoolean()
    ],
    bookmarkController.updateBookmark)

router.delete('/bookmark/:bookmarkId', bookmarkController.deleteBookmark)

module.exports = router