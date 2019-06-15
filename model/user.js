const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Folder = require('./folder')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    rootFolder: {
        type: Schema.Types.ObjectId,
        ref: 'folder',
        required: false
    }
}, {
    timestamps: true
})
// UserSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', UserSchema)