const Fish = require('../models/fish')
const User = require('../models/user')
const { find, schema } = require('../models/fish')

// exports.createFish = (req, res, next) => {
//     schema.pre("save", function(next) {
//         this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()
//         next()
    
//     User.findById(JSON.parse(req.body.userID))
//     .then((user) => {
//         const fish = new Fish({
//             userId: JSON.parse(req.body.userID),
//             userLastname: user.lastname,
//             userFirstname: user.firstname,
//             fishName: req.body.fishName,
//             fishSize: req.body.fishSize,
//             bait: req.body.bait,
//             water: req.body.water,
//             location: req.body.location,
//             date: req.body.date,
//             fishingSettup: req.body.fishingSettup,
//             description: req.body.description,
//             fishPic: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
//             comments: [],
//             likes: 0,
//             createdAt: Date.now()
//         })
//         fish.save()
//         .then(() => res.status(201).json({ message: 'Publication publiée !'}))
//         .catch(error => res.status(501).json({error}))
//     })
//     .catch(error => {
//         console.log(error)
//         res.status(502).json({error})
//     }) 
// }) 
// }
exports.createFish = (req, res, next) => {
    User.findById(JSON.parse(req.body.userID))
    .then((user) => {
        const fish = new Fish({
            userId: JSON.parse(req.body.userID),
            userLastname: user.lastname,
            userFirstname: user.firstname,
            postTitle: req.body.postTitle,
            fishName: req.body.fishName,
            fishSize: req.body.fishSize,
            bait: req.body.bait,
            water: req.body.water,
            location: req.body.location,
            date: req.body.date,
            fishingSettup: req.body.fishingSettup,
            description: req.body.description,
            fishPic: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            comments: [],
            likes: 0,
            usersLiked: [],
            createdAt: Date.now()
        })
        fish.save()
        .then(() => res.status(201).json({ message: 'Publication publiée !'}))
        .catch(error => res.status(501).json({error}))
    })
    .catch(error => {
        console.log(error)
        res.status(502).json({error})
    })  
}

exports.getAllFishes = (req, res) => {
    Fish.find().sort([['createdAt', -1]])
    .then((fishes) => {res.status(200).json(fishes)})
    .catch((error) => res.status(503).json({error}))
}

exports.getLikeStatut = (req, res) => {
    Fish.findById(req.params.postID)
    .then((fish) => {
        if (fish.usersLiked.includes(req.params.userID)) {
            res.status(201).json({like: true})
        }
        else {
            res.status(201).json({like: false})
        }
    })
    .catch((error) => res.status(503).json({error}))
}

exports.likeFish = (req, res) => {
    const user = req.body.userID
    let like = null
    Fish.findById({ _id: req.params.id  })
    .then(fish => {
        if (fish.usersLiked.includes(user)) {
            const i = fish.usersLiked.indexOf(user)
            fish.usersLiked.splice(i, 1)
            fish.likes -= 1
            like = false
        }
        else {
            fish.usersLiked.push(user)
            fish.likes += 1
            like = true
        }
        fish.save()
        .then(() => res.status(201).json({like}))
        .catch(error => res.status(502).json({error}))
    })
    .catch((error) => res.status(503).json({error}))
}




// exports.getAllFishes = (req, res) => {
//     Fish.find()
//     .then((fishes) => {
//         for (let i=0; i < fishes.length; i++) {
//             console.log(fishes[i].userId)
//             User.findById(fishes[i].userId)
//             .then(() => res.status(201).)
//         }
//     })
//     .catch((error) => res.status(503).json({error}))
// }