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
        startTier,
        endTier,
        startTime,
        headCount,
        top, bottom, mid, jungle, support,
        content,
        talkon
    } = req.body;

    let value = [
        userNickname,
        userId,
        gameMode,
        title,
        startTier,
        endTier,
        startTime,
        headCount,
        top, bottom, mid, jungle, support,
        content,
        talkon
    ]

    try{
        value.forEach(v => {
            if (!v || v === 'undefined') throw 'bad prameters' 
        })

        const lolpostCreated = await LoLPost.create({
            nickname : userNickname,
            UserId : userId,
            gameMode,
            title,
            startTier,
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
        if (err === 'post create error' || err === 'bad prameters')
            res.status(412).send({'msg' : err, 'code' : -412});
        else 
            res.status(500).send({'msg' : 'server error', 'code' : -500});
    }
})

module.exports = router;
