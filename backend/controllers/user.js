const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const crypto = require("crypto")
const sendEmail = require("../utils/email/sendEmail")
const sendSuccessEmail = require("../utils/email/sendSuccessEmail")

const User = require('../models/user')

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(userExist => {
        if (userExist === null) {
            if (req.body.birthday) {
                var birthday = req.body.birthday
            } else {
                birthday = undefined
            }
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    birthday: birthday,
                    profilPic: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    followers: [],
                    following: [],
                    posts: [],
                    fishLike: 0,
                    createdAt: Date.now(),
                    cookiesAccepted: true,
                    status: 'user'
                })
                user.save()
                .then(userCreated => {
                    let token = jwt.sign(
                        {userId: userCreated.id},
                        process.env.SECRET_KEY,
                        {expiresIn: '24h'})

                        const userData = {
                            userId: user.id,
                            userProfilPic: user.profilPic,
                            userStatus: user.status
                        }

                        res.cookie('token', token, { expires: new Date(Date.now() + 240 * 3600000) })
                        res.status(200).json(userData)        
                })
                .catch(() => res.status(400).json({error: 'Can\'t save user'}))
            })
            .catch(error => res.status(500).json({error}))
        } else {
            res.status(401).json({message: 'Email déjà utilisé!'})
        }
    })
    .catch(error => res.status(403).json({error})) 
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

                    const userData = {
                        userId: user.id,
                        userProfilPic: user.profilPic,
                        userStatus: user.status
                    }
                    
                    res.cookie('token', token, { expires: new Date(Date.now() + 240 * 3600000) }) 
                    res.status(200).json(userData)
                }
        })
        .catch(error => res.status(502).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}

exports.googleLogin = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            let randomPassword = crypto.randomBytes(32).toString("hex")
            bcrypt.hash(randomPassword, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    birthday: undefined,
                    profilPic: req.body.image,
                    followers: [],
                    following: [],
                    posts: [],
                    fishLike: 0,
                    createdAt: Date.now(),
                    cookiesAccepted: true,
                    status: 'user'  
                })
                user.save()
                .then(userCreated => {
                    let token = jwt.sign(
                        {userId: userCreated.id},
                        process.env.SECRET_KEY,
                        {expiresIn: '24h'})

                        const userData = {
                            userId: user.id,
                            userProfilPic: user.profilPic,
                            userStatus: user.status
                        }

                        res.cookie('token', token, { expires: new Date(Date.now() + 240 * 3600000) })
                        res.status(200).json(userData)        
                })
                .catch(() => res.status(400).json({error: 'Can\'t save user'}))
            })
            .catch(error => res.status(500).json({error}))
        }
        else {
            let token = jwt.sign(
                {userId: user.id},
                process.env.SECRET_KEY,
                {expiresIn: '24h'})

                const userData = {
                    userId: user.id,
                    userProfilPic: user.profilPic,
                    userStatus: user.status
                }
                
                res.cookie('token', token, { expires: new Date(Date.now() + 240 * 3600000) }) 
                res.status(200).json(userData)
        }   
    })
    .catch(error => res.status(500).json({error}))
}

exports.requestPasswordReset = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Email does not exist' })
        }     
        else {
            let resetToken = crypto.randomBytes(32).toString("hex")
            let userId = user._id
            bcrypt.hash(resetToken, 10) 
            .then(hash => {
                user.resetPasswordToken = hash
                user.resetPasswordExpires = Date.now() + 1800000 // Valid for 30 min
                user.save()
            }) 
            .catch(error => res.status(500).json({error}))
 
            // const link = `https://fishnfollow.com/reset/${resetToken}/${userId}` // prod
            const link = `http://localhost:8080/reset/${resetToken}/${userId}` // local
                
            sendEmail(req.body.email, link).catch(console.error)
            return res.json(link)
        }
    })
    .catch(error => res.status(502).json({error}))   
}

exports.resetPassword = (req, res) => {
    User.findById(req.body.userId)
    .then(user => {
        if (!user || !user.resetPasswordToken) {
            res.status(401).json({message: 'Le token de réinitilisation de mot de passe est incorrect ou a expiré'})
        }
        else if (user.resetPasswordExpires <= Date.now()) {
            res.status(401).json({message: 'Le token de réinitilisation de mot de passe est incorrect ou a expiré'})
        }
        else {
            bcrypt.compare(req.params.token, user.resetPasswordToken)
            .then(isValid => {
                if (!isValid) {
                    res.status(401).json({message: 'Le token de réinitilisation de mot de passe est incorrect ou a expiré'})
                }
                else {
                    bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        user.password = hash
                        user.resetPasswordToken = undefined
                        user.resetPasswordExpires = undefined
                        user.save()
                        .then(() => res.status(200).json({message: 'Successfully changed password!'}))
                        .catch(error => res.status(504).json({error}))
                    })
                    .catch(error => res.status(502).json({error}))

                    sendSuccessEmail(user.email).catch(console.error)
                }
            })
            .catch(error => res.status(502).json({error}))
        }    
    })
    .catch(error => res.status(503).json({error}))
}

exports.getOneUser = (req, res) => {
    User.findById(req.params.id)
    .then(user => res.status(201).json({user}))
    .catch(error => res.status(502).json({error}))
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({message: 'Votre compte a bien été supprimé!'}))
    .catch(error => res.status(502).json({error}))
}


exports.followOneUser = (req, res) => {
    if (req.body.authorID === req.body.targetUser) {
        res.status(500).json({message: 'Cant follow himself'})
    }
    else {
        User.findById(req.body.authorID)
        .then(author => {
            if (author.following.includes(req.body.targetUser)) { // Si on follow déjà, ne follow plus et retire ce follow de l'utilisateur ciblé
                const i = author.following.indexOf(req.body.targetUser)
                author.following.splice(i, 1) 
                User.findById(req.body.targetUser)
                .then(targetUser => {
                    const i = targetUser.followers.indexOf(req.body.authorID)
                    targetUser.followers.splice(i, 1)
                    author.save()
                    .then(
                        targetUser.save()
                        .then(() => res.status(201).json({message: "Ok!"}))
                        .catch(error => res.status(502).json({error}))
                    )
                    .catch(error => res.status(502).json({error}))
                })
                .catch(error => res.status(502).json({error}))
            }

            else {  // Follow l'user ciblé et lui ajoute un follower 
                author.following.push(req.body.targetUser)
                User.findById(req.body.targetUser)
                .then(targetUser => {
                    targetUser.followers.push(req.body.authorID)
                    author.save()
                    .then(
                        targetUser.save()
                        .then(() => res.status(201).json({message: "Ok!"}))
                        .catch(error => res.status(502).json({error}))
                    )
                    .catch(error => res.status(502).json({error}))
                    
                })
                .catch(error => res.status(503).json({error}))
            }
        })
        .catch(error => res.status(502).json({error}))
    }
}


exports.getAllFollowers = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        User.find({ _id: { $in: user.followers } })
        .then((allFollowers) => res.status(200).json({allFollowers}))
        .catch(error => res.status(501).json({error}))
    })
    .catch(error => res.status(502).json({error}))
}

exports.getAllFollowings = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        User.find({ _id: { $in: user.following } })
        .then((allFollowings) => res.status(200).json({allFollowings}))
        .catch(error => res.status(501).json({error}))
    })
    .catch(error => res.status(502).json({error}))
}

exports.searchUsers = (req, res) => {
    // console.log(req.body)
    // res.status(200).json({message: 'Ok'})
    // console.log('//////////////////////////////////////////////////////')
    // console.log('//////////////////////////////////////////////////////')
    // console.log('//////////////////////////////////////////////////////')
    console.log(req.body)
    let regexpLowCase = new RegExp("^" + req.body.toString().toLowerCase())
    let regexpUpperCase = new RegExp("^" + req.body.toString().toUpperCase())
    User.find({ firstname: {$in: [regexpUpperCase, regexpLowCase]} })
    .then((usersFound) => console.log(usersFound))
    // res.status(200).json(usersFound))
    .catch(error => res.status(502).json({error}))
}
