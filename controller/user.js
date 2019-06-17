const User = require('../model/user')
const Folder = require('../model/folder')

exports.getUser = async (req, res, next) => {
    const username = req.params.username
    try {
        const user = await User.find({
            username: username
        })
        if (!user) {
            const err = new Error("Could not find user")
            err.statusCode = 401
            throw err
        }
        res.status(200).json({
            message: 'Get user successful',
            user: user
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.createNewUser = async (req, res, next) => {
    const name = req.body.name
    try {
        const folder = await new Folder({
            name: `Main folder of ${name}`
        }).save()
        const user = new User({
            name: name,
            rootFolderId: folder
        })

        const respone = await user.save()
        res.status(201).json({
            message: 'Create user successful',
            user: respone
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}