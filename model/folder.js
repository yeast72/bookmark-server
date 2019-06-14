const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FolderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Bookmark',
        // autopopulate: true
    }],
    childFolderId: [{
        type: Schema.Types.ObjectId,
        ref: 'Folder'
    }]
}, {
    timestamps: true
})
// FolderSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Folder', FolderSchema)