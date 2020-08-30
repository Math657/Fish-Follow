const Fish = require('../models/fish')

exports.createFish = (req, res, next) => {
    const fishObject = JSON.parse(req.body.fish)
    const fish = new Fish({
        ...fishObject,
        
    })
}