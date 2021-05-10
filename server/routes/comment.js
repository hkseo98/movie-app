const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment")
const { auth } = require("../middleware/auth")



router.post('/getComments', auth, (req, res) => {

    Comment.find({ 'movieId': req.body.movieId })
        .populate('writer') // 댓글 작성자 정보도 모두 가져올 수 있음
        .exec((err, comments ) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success:true, comments})
    })
})


router.post('/saveComment', auth, (req, res) => {
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if(err) return res.json({ success: false, err})

        Comment.find({'_id': comment._id})
            .populate('writer') // 모든 writer의 정보를 가져온다.
            .exec((err, result) => {
                if(err) return res.json({ success: false, err})
                return res.status(200).json({ success: true, result })
            })
    })
})




module.exports = router;
