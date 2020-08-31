'use strict'

const router = require('express').Router();
const fetch = require('node-fetch');
const { LoLPost } = require('../../../models')

// '/post/lol/updatepost'
router.post('/', async (req,res) => {
    const {
        postId,
        userId,
        // 게시물에 올라갈 것들
        gameMode,
        title,
        starTier,
        endTier,
        startTime,
        headCount,
        top, bottom, mid, jungle, support,
        content,
        talkOn
    } = req.body;

    try{
        // 인가된 사용자인지 확인하는 로직들어갈 자리 => 쿠키로 구현해야 하나?
        // accesstoken? 쿠키 or session?

        const lolpostUpdated = await LoLPost.update({
            gameMode,
            title,
            starTier,
            endTier,
            startTime,
            headCount,
            top, bottom, mid, jungle, support,
            content,
            talkOn
        },{
            where : {id : postId}
        });
        console(lolpostUpdated)
        if (lolpostUpdated === null) throw 'post update error'

        res.send({'msg' : 'update success'});
    }
    catch (err) {
        if (err === 'post create error')
            res.status(412).send({'msg' : err, 'code' : -412});
        else 
            res.status(500).send({'msg' : 'server error', 'code' : -500});
    }

})

module.exports = router;
