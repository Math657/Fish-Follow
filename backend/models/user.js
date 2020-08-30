const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    firstname: {type: String, required: true},
    birthday: {type: Date, required: true},
    livingArea: {type: String, required: true},
    fishingStart: {type: Date, required: true},
    fishingHabits: {type: String, required: true},
    profilPic: {type: String},
    followers: {type: Number, required: true},
    followings: {type: Number, required: true},
    posts: {type: Array, required: true},
    createdAt: {type: Date, required: true}
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)