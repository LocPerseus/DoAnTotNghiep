const mongoose = require('mongoose')
const OBJECT_ID = mongoose.Schema.Types.ObjectId

const commentSchema = mongoose.Schema({
    userID: {
        type: OBJECT_ID,
        ref: 'User',
        require
    },
    comments: {
        type: String,
        required: [true, 'Comment must have a comments']
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment