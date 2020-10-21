const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
        try {
            const token = req.cookies.token  
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            const userId = decodedToken.userId

            if (req.body.userId && req.body.userId !== userId) {
                throw 'User ID non valable !'
            } 
            else {   
                next()
            }
        }
        catch (error) { res.status(401).json({ error: error | 'Requête non authentifiée !', message: 'Token non valide'})}
   
}