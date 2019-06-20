const express = require('express')
const {
    check
} = require('express-validator/check');

const router = express.Router()

const bookmarkController = require('../controller/bookmark')

router.get('/bookmarks', bookmarkController.getBookmarks)

router.get('/bookmark/:bookmarkId', bookmarkController.getBookmark)

router.post('/bookmark', [
    check('bookmark.title').not().isEmpty(),
    check('bookmark.url').not().isEmpty().isURL()
], bookmarkController.createBookmark)

router.put('/bookmark/:bookmarkId', [
        check('bookmark.title').not().isEmpty().toString(),
        check('bookmark.url').not().isEmpty().isURL().toString(),
        check('bookmark.completed').not().isEmpty().toBoolean(),
        check('bookmark.stared').not().isEmpty().toBoolean()
    ],
    bookmarkController.updateBookmark)

router.delete('/bookmark/:bookmarkId', bookmarkController.deleteBookmark)

module.exports = router