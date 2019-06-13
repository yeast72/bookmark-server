const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    folders: [{
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        // autopopulate: true
    }]
}, {
    timestamps: true
})
// UserSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', UserSchema)