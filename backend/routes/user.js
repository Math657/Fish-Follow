const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')

const userCtrl = require('../controllers/user')

router.post('/signup', multer, userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/myprofile/:id', auth, userCtrl.getOneUser)


module.exports = router