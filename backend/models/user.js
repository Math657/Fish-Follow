const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    name: {type: String, required: true, unique: false},
    firstname: {type: String, required: true, unique: false}
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)