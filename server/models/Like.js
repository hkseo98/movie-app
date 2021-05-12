const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectID,
        ref: 'Comment'
    }

}, { timestamps: true }) // 자동으로 생성시간 설정해줌

const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }