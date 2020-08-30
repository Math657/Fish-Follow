const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const fishSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    size: {type: Number, required: true},
    dateFished: {type: Date, required: true},
    location: {type: String, required: true},
    bait: {type: String},
    imageUrl: {type: String, required: true},
    settup: {type: String},
    description: {type: String},
    comments: {type: String},
    likes: {type: Number, required: true},
    createdAt: {type: Date, required: true}
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Fish', fishSchema)