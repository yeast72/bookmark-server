const User = require('../model/user')

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