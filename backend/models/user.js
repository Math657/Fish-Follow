const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    lastname: {type: String, required: true},
    firstname: {type: String, required: true},
    birthday: {type: Date, required: true},
    // country: {type: String, required: true},
    // livingArea: {type: String, required: true},
    // startedFishingDate: {type: Date, required: true},
    // fishingHabits: {type: String, required: true},
    profilPic: {type: String},
    followers: {type: Number, required: true},
    following: {type: Number, required: true},
    posts: {type: Array, required: true},
    createdAt: {type: Date, required: true}
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)