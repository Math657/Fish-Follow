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
    followers: {type: Array, required: true},
    following: {type: Array, required: true},
    posts: {type: Array, required: true},
    fishLike: {type: Number, required: true},
    createdAt: {type: Date, required: true}
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)