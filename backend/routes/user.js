const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')

const userCtrl = require('../controllers/user')

router.post('/signup', multer, userCtrl.signup)
router.post('/login', userCtrl.login)
router.post('/follow', auth, userCtrl.followOneUser)
router.get('/profile/:id', auth, userCtrl.getOneUser)
router.get('/profile/followers/:id', auth, userCtrl.getAllFollowers)
router.get('/profile/followings/:id', auth, userCtrl.getAllFollowings)
router.post('/search', auth, userCtrl.searchUsers)
router.delete('/profile/:id', auth, userCtrl.deleteUser)


module.exports = router