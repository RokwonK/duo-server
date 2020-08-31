'use strict'

const router = require('express').Router();
const fetch = require('node-fetch');

// '/post/lol/uploadpost'
router.post('/', async (req,res) => {
    const {
        nickname,
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
        // 사용자에게 보내주는 id를 암호화해서 보내주기
        // id를 복호화해서


        // 인가된 사용자인지 확인           하는 로직들어갈 자리 => 쿠키로 구현해야 하나?
        

        const lolpostCreated = await LoLPost.create({
            nickname,
            userId,
            gameMode,
            title,
            starTier,
            endTier,
            startTime,
            headCount,
            top, bottom, mid, jungle, support,
            content,
            talkOn
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
