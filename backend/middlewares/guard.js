const User = require('../models/user')

module.exports = (req, res, next) => {
    User.findById(req.body.userID)
    .then(user => {
        if (user.requestLimit) {
            let previousRequest = user.requestLimit
            let newDate = new Date()
            let delay = newDate - previousRequest
            console.log(delay)
            if (delay > 1000) {
                user.requestLimit = new Date()
                user.save()
                next()
            } else {
                res.status(425).json({error: 'Too many requests'})
            }
        }
        else {
            user.requestLimit = new Date()
            user.save()
            next()
        }                  
    })
    .catch(error => res.status(502).json({error}))
}
