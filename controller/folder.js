const Folder = require('../model/folder')

exports.createFolder = async (req, res, next) => {
    const name = req.body.folder.name
    const folder = new Folder({
        name: name
    })
    try {
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
    const newFolder = req.body.folder
    try {
        const folder = await Folder.findById(folderId)
        if (!folder) {
            const error = new Error('Could not find folder')
            error.statusCode = 404
            throw error
        }
        folder.name = newFolder.name
        folder.bookmarks = newFolder.bookmarks
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
        let result = {}
        folders.forEach(folder => {
            result[folder._id] = folder;
        })
        res.status(200).json({
            message: "Get folder successful",
            folder: result
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