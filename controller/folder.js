const {
    validationResult
} = require('express-validator/check');

const Folder = require('../model/folder')
const Bookmark = require('../model/bookmark')

exports.createFolder = async (req, res, next) => {
    try {
        const name = req.body.folder.name
        const folder = new Folder({
            name: name
        })

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(402).json({
                errors: errors.array()
            })
        }
        const newFolder = await folder.save()
        res.status(201).json({
            message: "create new folder successful",
            folder: newFolder
        })
    } catch (err) {
        console.log(err)
    }
}

exports.updateFolder = async (req, res, next) => {
    const folderId = req.params.folderId
    try {
        const newFolder = req.body.folder
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(402).json({
                errors: errors.array()
            })
        }
        const folder = await Folder.findById(folderId)
        if (!folder) {
            const error = new Error('Could not find folder')
            error.statusCode = 404
            throw error
        }
        folder.name = newFolder.name
        folder.bookmarksId = newFolder.bookmarksId
        folder.childFolderId = newFolder.childFolderId
        const updateFol = await folder.save()
        res.status(200).json({
            message: "Update folder successful",
            folder: updateFol
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getFolders = async (req, res, next) => {
    try {
        const folders = await Folder.find()
        if (!folders) {
            const error = new Error('Could not find folder')
            error.status = 404
            throw error
        }
        res.status(200).json({
            message: "Get folder successful",
            folders: folders
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getFolder = async (req, res, next) => {
    const folderId = req.params.folderId
    try {
        if (folderId === 'root') {
            const folder = await Folder.findById('5d0271c91f3acd1c80a2307e')
            res.status(200).json({
                message: "Get root folder successful",
                folder: folder
            })
        }
        const folder = await Folder.findById(folderId)
        if (!folder) {
            const error = new Error('Could not find folder')
            error.status = 404
            throw error
        }
        res.status(200).json({
            message: "Get folder successful",
            folder: folder
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.deleteFolder = async (req, res, next) => {
    const folderId = req.params.folderId
    try {
        const folder = await Folder.findById(folderId)
        if (!folder) {
            const error = new Error('Could not find post');
            error.statusCode = 404
            throw error
        }
        const parentFolder = await Folder.findOne({
            childFolderId: folderId
        })
        await parentFolder.removeFolder(folderId)
        folder.bookmarksId.forEach(id => {
            Bookmark.findById(id)
                .then(result => {
                    return Bookmark.findByIdAndRemove(result._id)
                }).then(result => {
                    console.log(`Remove ${result.title}`)
                })
                .catch(err => {
                    console.log(err)
                })
        })
        await Folder.findByIdAndRemove(folderId)
        res.status(200).json({
            message: 'Delete folder.'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}