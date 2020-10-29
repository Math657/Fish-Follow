const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = mongoose.Schema({
    postID: {type: String, required: true},
    createdAt: {type: Date, required: true},
    comment: {type: String, required: true},
    author: {type: String, required: true},
    authorID: {type: String, required: true}
})

commentSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Comment', commentSchema)