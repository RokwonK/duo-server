'use strict'

const router = require('express').Router()
const { Op } = require('sequelize')
const { LoLPost } = require('../../../models')


// '/post/lol/getpost'   처음 게시판 접속
router.post('/', async (req, res) => {
    //console.log('get post')


    try {
        const posts = await LoLPost.findAll()
        res.json(posts)
    }
    catch (err) {
        console.log(1)
        res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }
})



// filter 셋팅 후 게시판 접속
router.post('/filter', async (req, res) => {
    //console.log('get post filter')
    if (req === 'undefined') throw 'bad access'
    const {
        gameMode,
        headCount,
        wantTier,
        startTime,
        top, bottom, mid, jungle, support,
        talkon,
    } = req.body;


    try {
        const whereOptions = {};
        const indexName = ["top", "bottom", "mid", "jungle", "support", "talkon"];
        const positionArray = [ top, bottom, mid, jungle, support, talkon ];

        // find해서 일정 갯수만 보내주기, 프론트에서 화면의 끝에 다다들면 다시 개수요청
        if (gameMode !== "all") whereOptions["gameMode"] = gameMode;
        whereOptions["headCount"] = { [Op.lte] : headCount }
        // 자신이 포함되는 곳을 찾고 싶은 것
        whereOptions["startTier"] = { [Op.lte] : wantTier }
        whereOptions["endTier"] = { [Op.gte] : wantTier }
        whereOptions["startTime"] = { [Op.gte] : startTime }
        
        positionArray.forEach((value, index) => {
            if (value === 3)
                whereOptions[indexName[index]] = { [Op.lte] : value}
            else
                whereOptions[indexName[index]] = value;
        })

        // 보내는 양의 갯수 제한을 둘 것인가?

        const filteringData = await LoLPost.findAll({
            where : whereOptions,
            order : ["starTime", "ASC"]
        })
        if (!filteringData) throw 'no data'
        
        console.log(filteringData);
        res.send(filteringData);
    }
    catch (err) {
        if (err === 'no data')
            res.status(412).send({ 'msg': err, 'code': -412 })
        else if (err === 'bad access')
            res.status(412).send({ 'msg': 'bad access', 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }
})


module.exports = router