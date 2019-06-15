const Bookmark = require('../model/bookmark')
const User = require('../model/user')

exports.getBookmarks = async (req, res, next) => {
    try {
        const bookmarks = await Bookmark.find().sort({
            createdAt: -1
        })
        res.status(200).json({
            message: 'Fetched Bookmamarks',
            bookmarks: bookmarks
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}


exports.createBookmark = async (req, res, next) => {
    const title = req.body.bookmark.title
    const url = req.body.bookmark.url
    const bookmark = new Bookmark({
        title: title,
        url: url,
        completed: false
    })
    try {
        const newBookmark = await bookmark.save()
        res.status(201).json({
            message: 'Bookmark created successfully!',
            bookmark: newBookmark,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.updateBookmark = async (req, res, next) => {
    const bookmarkId = req.params.bookmarkId
    const newBookmark = req.body.bookmark
    try {
        const bookmark = await Bookmark.findById(bookmarkId)
        if (!bookmark) {
            const error = new Error('Could not find Bookmark')
            error.statusCode = 404
            throw error
        }
        bookmark.title = newBookmark.title
        bookmark.url = newBookmark.url
        bookmark.completed = newBookmark.completed
        bookmark.stared = newBookmark.stared
        const result = await bookmark.save()
        return res.status(200).json({
            message: 'Update bookmark.',
            bookmark: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.deleteBookmark = async (req, res, next) => {
    const bookmarkId = req.params.bookmarkId
    try {
        const bookmark = await Bookmark.findById(bookmarkId)
        if (!bookmark) {
            const error = new Error('Could not find Bookmark')
            error.statusCode = 404
            throw error
        }
        await Bookmark.findByIdAndRemove(bookmarkId)
        return res.status(200).json({
            message: 'Delete Bookmark.'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}