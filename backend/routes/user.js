const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')

const userCtrl = require('../controllers/user')

router.post('/signup', multer, userCtrl.signup)
router.post('/login', userCtrl.login)
router.post('/follow', auth, userCtrl.followOneUser)
router.get('/myprofile/:id', auth, userCtrl.getOneUser)
router.get('/myprofile/followers/:id', auth, userCtrl.getAllFollowers)
router.delete('/myprofile/:id', auth, userCtrl.deleteUser)


module.exports = router