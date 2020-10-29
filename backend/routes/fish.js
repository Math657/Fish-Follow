const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')
// const uppercase = require('../middlewares/uppercase')

const fishCtrl = require('../controllers/fish')

router.post('/post', auth, multer, fishCtrl.createFish)
router.post('/like/:id', auth, fishCtrl.likeFish)
router.get('/home', auth, fishCtrl.getAllFishes)

module.exports = router