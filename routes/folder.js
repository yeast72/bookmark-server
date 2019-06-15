const express = require('express')

const router = express.Router()

const folderController = require('../controller/folder')

router.get('/folders', folderController.getFolders)

// router.get('/rootfolder', folderController.getRootFolder)

router.get('/folder/:folderId', folderController.getFolder)

router.post('/folder', folderController.createFolder)

router.put('/folder/:folderId', folderController.updateFolder)

router.delete('/folder/:folderId', folderController.deleteFolder)


module.exports = router