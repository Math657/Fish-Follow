const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const commentCtrl = require('../controllers/comment')

router.post('/comment', auth, commentCtrl.createComment)
router.get('/getcomments/:id', commentCtrl.getLastComments)

module.exports = router