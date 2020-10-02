const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const fishSchema = mongoose.Schema({
    userId: {type: String, required: true},
    userLastname: {type: String, required: true},
    userFirstname: {type: String, required: true},
    fishName: {type: String, required: true},
    fishSize: {type: Number, required: true},
    date: {type: Date, required: true},
    water: {type: String, required: true},
    location: {type: String, required: true},
    bait: {type: String},
    fishPic: {type: String, required: true},
    fishingSettup: {type: String},
    description: {type: String},
    comments: {type: Array},
    likes: {type: Number, required: true},
    createdAt: {type: Date, required: true}
})

fishSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Fish', fishSchema)