'use strict'

const router = require('express').Router()
const { LoLPost } = require('../../models')

// '/post/mypost'
router.post('/', async (req,res) => {
    if (req === 'undefined') throw 'bad access'

    // userId(user의 id(primaryKey)인 userId)를 받아서
    // 해당 userId(foreignKey)를 가진 post출력
    const { userId } = req.body

    // overwatch, battleground 테이블은 join으로 처리 (include)
    try {
        const mypost = await LoLPost.findAll({
            where: { userId: userId },
        })
        res.send(mypost)
    }
    catch (err) {
        if (err === 'bad access')
            res.status(412).send({ 'msg': 'bad access', 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }

})

module.exports = router;
