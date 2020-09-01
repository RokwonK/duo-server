'use strict'

const router = require('express').Router();
const { Op } = require('sequelize')
const { User } = require('../../../models')

// '/login/delete_account'
router.post('/', async (req, res) => {

    if (req === 'undefined') throw 'bad access'
    // user 정보 받고
    // snsid, sns, nickname 3개 다 일치해야함
    const {
        snsId,
        sns,
        nickname
    } = req.body

    try {
        await User.destroy({
            where: {
                [Op.and]: [{ snsId: snsId }, { sns: sns }, { nickname: nickname }]
            },
        })
        res.send({'msg' : 'delete success'})
    }
    catch (err) {
        if (err === 'bad access')
            res.status(412).send({ 'msg': 'bad token', 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }

})

module.exports = router;