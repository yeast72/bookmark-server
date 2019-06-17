const express = require('express')

const router = express.Router()

const userController = require('../controller/user')

router.get('/user/:username', userController.getUser)

router.post('/user', userController.createNewUser)

module.exports = router