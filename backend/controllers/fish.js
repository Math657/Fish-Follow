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

exports.likeFish = (req, res) => {
    const likeStatus = req.body.like
    const user = req.body.userID
    Fish.findOne({_id: req.params.id  })
    .then(fish => {

    })
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