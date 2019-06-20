const express = require('express')
const {
    check
} = require('express-validator/check');

const router = express.Router()

const folderController = require('../controller/folder')

router.get('/folders', folderController.getFolders)

router.get('/folder/:folderId', folderController.getFolder)

router.post('/folder', [
    check('folder').not().isEmpty(),
    check('folder.name').not().isEmpty().isString()
], folderController.createFolder)

router.put('/folder/:folderId', [
    check('folder.name').not().isEmpty().isString()
], folderController.updateFolder)

router.delete('/folder/:folderId', folderController.deleteFolder)


module.exports = router