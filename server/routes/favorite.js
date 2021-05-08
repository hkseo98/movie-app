const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {
    Favorite.find({ "movieId": req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            let length = info === null ? 0 : info.length
            res.status(200).json({ success:true, favoriteNumber: length })
        })
})

router.post('/favorited', (req, res) => {
    // 내가 이 영화를 favorite 리스트에 넣었는지 여부를 db에서 가져오기.
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            let result = false
            if(info.length !== 0) {
                result = true
            }
            res.status(200).json({ success:true, favorited: result })
        })
})

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true })
        })
})

router.post('/addToFavorite', (req, res) => {
    Favorite.findOne({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, info)=> {
            if(err) return res.status(400).send(err)
            if(!info) {
                const favorite = new Favorite(req.body)
                favorite.save((err, doc) => {
                if(err) return res.status(400).send(err)
                return res.status(200).json({ success: true })
                })
            } else {
                return res.status(200).json({ success:false })
            }
        }) 
})

module.exports = router