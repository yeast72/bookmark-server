const mongoose = require('mongoose')
const Schema = mongoose.Schema

const folderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bookmarksId: [{
        type: Schema.Types.ObjectId,
        ref: 'Bookmark',
    }],
    childFolderId: [{
        type: Schema.Types.ObjectId,
        ref: 'Folder'
    }]
}, {
    timestamps: true
})

folderSchema.methods.removeFolder = function (folderId) {
    const updateChildFolderId = this.childFolderId.filter(id => {
        return id.toString() !== folderId.toString()
    });
    this.childFolderId = updateChildFolderId
    return this.save()
}

module.exports = mongoose.model('Folder', folderSchema)