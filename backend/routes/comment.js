const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const commentCtrl = require('../controllers/comment')

router.post('/comment', auth, commentCtrl.createComment)
router.get('/getcomments/:id', commentCtrl.getLastComments)
router.delete('/deleteComment/:id', auth, commentCtrl.deleteComment)
router.delete('/deleteCommentAdmin/:id/:userId', auth, commentCtrl.deleteCommentAdmin)

module.exports = router