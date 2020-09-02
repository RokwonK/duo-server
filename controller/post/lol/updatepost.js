'use strict'

const router = require('express').Router();
const fetch = require('node-fetch');
const { LoLPost } = require('../../../models')

// '/post/lol/updatepost'
router.post('/', async (req,res) => {
    const {
        postId,
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

    try{

        await LoLPost.update({
            gameMode,
            title,
            startTier,
            endTier,
            startTime,
            headCount,
            top, bottom, mid, jungle, support,
            content,
            talkon
        },{
            where : {id : postId}
        });
        //console(lolpostUpdated)
        //if (lolpostUpdated === null) throw 'post update error'

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
