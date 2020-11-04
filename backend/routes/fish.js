const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')

const fishCtrl = require('../controllers/fish')

router.post('/post', auth, multer, fishCtrl.createFish)
router.post('/like/:id', auth, fishCtrl.likeFish)
router.get('/home', auth, fishCtrl.getAllFishes)
router.get('/likeStatut/:postID/:userID', auth, fishCtrl.getLikeStatut)

module.exports = router