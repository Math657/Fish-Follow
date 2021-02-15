const Comment = require('../models/comment')
const Fish = require('../models/fish')
const User = require('../models/user')

exports.createComment = (req, res) => {
    User.findById(req.body.authorID)
    .then((user) => {
        const comment = new Comment({
            postID: req.body.postID,
            createdAt: Date.now(),
            comment: req.body.comment,
            author: user.firstname + ' ' + user.lastname,
            authorID: req.body.authorID
        })
        comment.save()
        .then((com) => res.status(200).json(com))
        .catch(error => res.status(503).json({error}))
    })
    .catch(error => res.status(501).json({error}))  
}

exports.getLastComments = (req, res) => {
    let arrAuthorID = []
    Comment.find({ postID: req.params.id }).sort([['createdAt', -1]])
    .then((comments) => {
        if (comments.length > 0) {
            for (i=0; i < comments.length; i++) {
                arrAuthorID.push(comments[i].authorID)
                // check si l'auteur ID est déjà présent avant de push
            }
            User.find({ _id: { $in: arrAuthorID } })
            .then((users) => {         
                const myData = comments.map((comment) => {
                    return {
                        comment, 
                        user: users.find((user) => String(user._id) === comment.authorID)
                    }
                })
                res.status(200).json(myData)
            })
            .catch((error) => res.status(502).json({error}))
        }      
    })
    .catch((error) => res.status(503).json({error}))
}

exports.deleteComment = (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({message: 'Commentaire supprimé'}))
    .catch(error => res.status(502).json({error}))
}

exports.deleteCommentAdmin = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if (user.status === 'admin') {
            Comment.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({message: 'Commentaire supprimé'}))
            .catch(error => res.status(502).json({error}))
        }
    })
    .catch(error => res.status(503).json({error}))
}