const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectID, // 유저 아이디를 통해 유저 모델의 모든 정보를 가져올 수 있다. 
        ref: 'User'
    },
    movieId: {
       type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
}, { timestamps: true }) // 자동으로 생성시간 설정해줌

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }