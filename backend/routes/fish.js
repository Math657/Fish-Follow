const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')

const fishCtrl = require('../controllers/fish')

router.post('/post', multer, fishCtrl.createFish)
router.get('/home', auth, fishCtrl.getAllFishes)

module.exports = router