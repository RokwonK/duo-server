'use strict'
const { User, LoLComment } = require('../../models');

// post의 get(filter 포함), LIMIT(갯수)과 OFFSET(어디서부터) 넣기
// post에는 post_id, user_id, content => 
// put에는 post_id, content_id =>
// delete에는 user_id, post_id 둘다 =>

/*#################################################
    comment create => content, userId, postId, nickname
#################################################*/
exports.addlolComment = async (req, res, next) => {
    const { content, userId, postId, nickname } = req.body;

    try {
        const createComment = await LoLComment.create({
            content,
            userId : parseInt(userId), 
            postId : parseInt(postId), 
            nickname
        })
        console.log('댓글 생성 => ', createComment)
        
        res.send({'msg' : 'create success'});
    }
    catch(err) {
        console.log('에러 => ',err);
        res.send({'msg' : 'create success', 'code' : -500});
    }
}

/*#################################################
    comment get => content, userId, postId, nickname
#################################################*/
exports.getlolComment = async (req, res, next) => {
    const {
        postId
    } = req.query;
    console.log('받은 쿼리 =>', req.query);

    try {
        if (postId === 'undefined' || !postId) throw 'bad query'

        const comments = await LoLComment.findAll({
            where : {
                postId : parseInt(postId) 
            }
        });

        console.log('댓글들 =>', comments);
        res.send(comments);
    }
    catch (err) {
        if (err === 'bad route') res.send({ 'msg': err, 'code': -404 });
        else res.send({ 'msg': 'server error', 'code': -404 })
    }
}

/*#################################################
    mycomment get => userId
#################################################*/
exports.getMyCommet = async(req, res, next) => {
    const {
        userId
    } = req.query;
    console.log('받은 쿼리 =>', req.query);

    try {
        if (userId === 'undefined' || !userId) throw 'bad query'

        const comments = await LoLComment.findAll({
            where : {
                userId : parseInt(userId)
            }
        });
        console.log('댓글들 =>', comments);
        res.send(comments);
    }
    catch (err) {
        if (err === 'bad route') res.send({ 'msg': err, 'code': -404 });
        else res.send({ 'msg': 'server error', 'code': -404 })
    }
}

exports.updatelolComment = async (req, res, next) => {
    const {
        commentId,
        content,
        userId
    } = req.body

    try {

    }
    catch(err) {

    }
    
}

exports.deletelolComment = async (req, res, next) => {
    const {
        commentId,
        userId
    } = req.body

    try {
        await LoLComment.destroy({
            where : {
                id : commentId,
                userId
            }
        })

        res.send({'msg' : 'delete success'});
    }
    catch(err) {
        res.send({'msg' : 'server error', 'code' : -500});
    }
}



