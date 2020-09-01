'use strict'

const router = require('express').Router()
const { Op } = require('sequelize')
const { LoLPost } = require('../../../models')


// '/post/lol/getpost'   처음 게시판 접속
router.post('/', async (req, res) => {
    //console.log('get post')
    if (req === 'undefined') throw 'bad access'

    try {
        const posts = await LoLPost.findAll()
        res.json(posts)
    }
    catch (err) {
        if (err === 'bad access')
            res.status(412).send({ 'msg': 'bad access', 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }
})



// filter 셋팅 후 게시판 접속
router.post('/getpost/filter', async (req, res) => {
    //console.log('get post filter')
    if (req === 'undefined') throw 'bad access'

    // 필터
    /* gameMode: 일치할 때
       startTier, endTier: (startTier <= endTier) && (endTier >= startTier) 인 범위
       headCount: 이하
       position: 1->x, 2->o, 3->상관x
       talkOn: 1->x, 2->o, 3->상관x  */

    /* position,talkOn 구분
       position 상관없음, talkOn 구분
       position 구분, talkOn 상관없음
       position, talkOn 상관없음  */

    
    // gameMode, headCount 추가로 구분해야함
    try {
        if (top !== 2 && talkOn !== 2) {  // position, talkOn 둘 다 구분
            const posts = await LoLPost.findAll({
                where: {
                    gamgeMode: gameMode,
                    [Op.and]: [{ startTier: { [Op.lte]: endTier } }, { endTirer: { [Op.gte]: startTier } }],
                    startTime: startTime,
                    headCount: headCount,
                    top: top, bottom: bottom, mid: mid, jungle: jungle, support: support,
                    talkon: talkOn
                }
            })
            res.json(posts)
        }
        else if (top === 2 && talkOn !== 2) {  // position 상관없음, talkOn 구분
            const posts = await LoLPost.findAll({
                where: {
                    gamgeMode: gameMode,
                    [Op.and]: [{ startTier: { [Op.lte]: endTier } }, { endTirer: { [Op.gte]: startTier } }],
                    startTime: startTime,
                    headCount: headCount,
                    talkon: talkOn
                }
            })
            res.json(posts)
        }
        else if (top !== 2 && talkOn === 2) {  // position 구분, talkOn 상관없음
            const posts = await LoLPost.findAll({
                where: {
                    gamgeMode: gameMode,
                    [Op.and]: [{ startTier: { [Op.lte]: endTier } }, { endTirer: { [Op.gte]: startTier } }],
                    startTime: startTime,
                    headCount: headCount,
                    top: top, bottom: bottom, mid: mid, jungle: jungle, support: support,
                }
            })
            res.json(posts)
        }
        else /*if (top === 2 && talkOn === 2)*/ {  // position, talkOn 상관없음
            const posts = await LoLPost.findAll({
                where: {
                    gamgeMode: gameMode,
                    [Op.and]: [{ startTier: { [Op.lte]: endTier } }, { endTirer: { [Op.gte]: startTier } }],
                    startTime: startTime,
                    headCount: headCount,
                    top: top, bottom: bottom, mid: mid, jungle: jungle, support: support,
                    talkon: talkOn
                }
            })
            res.json(posts)
        }
    }
    catch (err) {
        if (err === 'bad access')
            res.status(412).send({ 'msg': 'bad access', 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }

})

module.exports = router