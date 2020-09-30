const Fish = require('../models/fish')

exports.createFish = (req, res, next) => {
    const fish = new Fish({
        userId: req.body.userID,
        fishName: req.body.fishName,
        fishSize: req.body.fishSize,
        bait: req.body.bait,
        location: req.body.location,
        date: req.body.date,
        fishingSettup: req.body.fishingSettup,
        description: req.body.description,
        fishPic: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        comments: [],
        likes: 0,
        createdAt: Date.now()
    })
    fish.save()
    .then(() => res.status(201).json({ message: 'Publication publiée !'}))
    .catch(error => res.status(503).json({error}))
}

exports.getAllFishes = (req, res) => {
    Fish.find()
    .then((fishes) => {res.status(200).json(fishes)})
    .catch((error) => res.status(503).json({error}))
}