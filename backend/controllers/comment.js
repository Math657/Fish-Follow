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
        .then(() => res.status(200).json({ message: 'Commentaire publié !'}))
        .catch(error => res.status(501).json({error}))
    })
    .catch(error => res.status(501).json({error}))
    
}

exports.getLastComments = (req, res) => {
    let arrAuthorID = []
    Comment.find({ postID: req.params.id }).sort([['createdAt', -1]])
    .then((comments) => {
        if (comments.length > 0) {
            console.log('////////////////////////////////////////////////////////')
            for (i=0; i < comments.length; i++) {
                arrAuthorID.push(comments[i].authorID)
            }
            User.find({ _id: { $in: arrAuthorID } })
            .then((users) => {
    
                myData = [comments.push(users)]
                console.log(myData)
                res.status(200).json(myData)
            })
        }      
    })
    .catch((error) => res.status(503).json({error}))
}

// exports.getLastComments = (req, res) => {
//     Comment.find({ postID: req.params.id }).sort([['createdAt', -1]])
//     .then((comments) => {res.status(200).json(comments)})
//     .catch((error) => res.status(503).json({error}))
// }