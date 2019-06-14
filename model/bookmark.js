const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookmarkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    },
    stared: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Bookmark', bookmarkSchema)