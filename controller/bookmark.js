const {
    validationResult
} = require('express-validator/check');

const Bookmark = require('../model/bookmark')
const Folder = require('../model/folder')
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

exports.getBookmark = async (req, res, next) => {
    const bookmarkId = req.params.bookmarkId
    try {
        const bookmark = await Bookmark.findById(bookmarkId)

        if (!bookmark) {
            const error = new Error('Could not find Bookmark')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: 'Get bookmark',
            bookmark: bookmark,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.createBookmark = async (req, res, next) => {
    try {
        const title = req.body.bookmark.title
        const url = req.body.bookmark.url
        const bookmark = new Bookmark({
            title: title,
            url: url,
        })
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(402).json({
                errors: errors.array()
            })
        }
        const newBookmark = await bookmark.save()
        res.status(200).json({
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
    try {
        const newBookmark = req.body.bookmark

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(402).json({
                errors: errors.array()
            })
        }

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
        const folder = await Folder.findOne({
            bookmarksId: bookmarkId
        })
        const newBookmarksId = folder.bookmarksId.filter(id => id.toString() !== bookmarkId.toString())
        folder.bookmarksId = newBookmarksId
        await folder.save()
        await Bookmark.findByIdAndRemove(bookmarkId)
        return res.status(201).json({
            message: 'Delete Bookmark.'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}