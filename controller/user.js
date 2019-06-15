const User = require('../model/user')
const Folder = require('../model/folder')

exports.getLogin = async (req, res, next) => {
    try {
        const user = await User.findById('5ce11b1f280a720f7c9243a9')
        res.status(200).json({
            message: 'Login Successful',
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
            rootFolder: folder
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