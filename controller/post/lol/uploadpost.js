'use strict'

const router = require('express').Router();
const fetch = require('node-fetch');
const {LoLPost} = require('../../../models');

// '/post/lol/uploadpost'
router.post('/', async (req,res) => {
    const {
        userNickname,
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
        talkon
    } = req.body;

    try{
        // 사용자에게 보내주는 id를 암호화해서 보내주기
        // id를 복호화해서


        // 인가된 사용자인지 확인 들어오기 전에 처리함
        

        const lolpostCreated = await LoLPost.create({
            userNickname,
            userId,

            gameMode,
            title,
            starTier,
            endTier,
            startTime,
            headCount,
            top, bottom, mid, jungle, support,
            content,
            talkon
        });
        console.log(lolpostCreated)
        if (lolpostCreated === null) throw 'post create error'

        res.send({'msg' : 'create success'});
    }
    catch (err) {
        if (err === 'post create error')
            res.status(412).send({'msg' : err, 'code' : -412});
        else 
            res.status(500).send({'msg' : 'server error', 'code' : -500});
    }
})

module.exports = router;
