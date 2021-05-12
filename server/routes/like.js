const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like')
const { Dislike } = require('../models/Dislike')

router.post('/getLikes', (req, res) => {
    Like.find({ commentId: req.body.commentId, userId: req.body.userId })
        .exec((err, likes) => {
            if(err) return res.status(404).send(err)
            return res.status(200).json({ success: true, likes})
        })
})

router.post('/getDislikes', (req, res) => {
    Dislike.find({ commentId: req.body.commentId, userId: req.body.userId })
        .exec((err, dislikes) => {
            if(err) return res.status(404).send(err)
            return res.status(200).json({ success: true, dislikes})
        })
})

router.post('/upLike', (req, res) => {
    // like collection에 클릭 정보 넣기
    const like = new Like(req.body)
    like.save((err, likeResult) => {
        if(err) return res.json({ success:false, err})
        // 만약 dislike이 먼저 클릭이 되어 있다면, dislike을 1 줄여준다.
        Dislike.findOneAndDelete({ commentId: req.body.commentId, userId: req.body.userId })
            .exec((err, disLikeResult) => {
                if(err) return res.status(400).send(err)
                return res.status(200).json({ success: true })
            })
    })
})

router.post('/unLike', (req, res) => {
    Like.findOneAndDelete({ commentId: req.body.commentId, userId: req.body.userId })
        .exec((err, result) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true })
        })

})

router.post('/unDislike', (req, res) => {
    Dislike.findOneAndDelete({ commentId: req.body.commentId, userId: req.body.userId })
        .exec((err, result) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true })
        })
})

router.post('/upDislike', (req, res) => {
    // dislike collection에 클릭 정보 넣기
    const dislike = new Dislike(req.body)
    dislike.save((err, dislikeResult) => {
        if(err) return res.json({ success:false, err})
        // 만약 like이 먼저 클릭이 되어 있다면, like을 1 줄여준다.
        Like.findOneAndDelete({ commentId: req.body.commentId, userId: req.body.userId })
            .exec((err, likeResult) => {
                if(err) return res.status(400).send(err)
                return res.status(200).json({ success: true })
            })
    })
})


module.exports = router