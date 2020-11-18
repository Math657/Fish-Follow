const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const User = require('../models/user')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            birthday: req.body.birthday,
            // livingArea: req.body.livingArea,
            // startedFishingDate: req.body.startedFishingDate,
            // fishingHabits: req.body.fishingHabits,
            profilPic: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            followers: [],
            following: [],
            posts: [],
            fishLike: 0,
            createdAt: Date.now()
        })
        user.save()
        .then(userCreated => {
            let token = jwt.sign(
                {userId: userCreated.id},
                process.env.SECRET_KEY,
                {expiresIn: '24h'})

                res.cookie('token', token, { expires: new Date(Date.now() + 240 * 3600000) })
                res.status(200).json({userId: userCreated.id})
        })
        // .then(() => res.status(201).json({ message: 'Utilisateur créé!' }))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Email incorrect!' })
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ message: 'Mot de passe incorrect!' })
            }
            else { 
                let token = jwt.sign(
                    {userId: user.id},
                    process.env.SECRET_KEY,
                    {expiresIn: '24h'})
                    
                    res.cookie('token', token, { expires: new Date(Date.now() + 240 * 3600000) })
                    res.status(200).json({userId: user.id})
                }
        })
        .catch(error => res.status(502).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}

exports.getOneUser = (req, res) => {
    User.findById(req.params.id)
    .then(user => res.status(201).json({user}))
    .catch(error => res.status(502).json({error}))
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.status(201).json({message: 'Votre compte a bien été supprimé!'}))
    .catch(error => res.status(502).json({error}))
}