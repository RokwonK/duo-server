'use strict'
const router = require('express').Router()
const { User } = require('../../models')

router.get('/:id/:sns', async (req,res) => {
    const snsId = req.params.id;
    const sns = req.params.sns;
    
    try {
        if (snsid === 'undefined') throw 'token miss'

        const exUser = await User.findOne({
            attributes : ['id', 'nickname'],
            where : {
                userid : snsId,
                sns : sns
            }
        })
    
        if (exUser)
            res.send({'nickname' : exUser.nickname, 'id' : exUser.id})
        else {
            console.log('nickname 생성 필요')
            res.send({'nickname':'needNickname', 'id': -1})
        }
    }
    catch(err) {
        console.log(err)
        if (err === 'token miss') 
            res.status(412).send({'msg' : 'bad token', 'code' : -412})
        else
            res.status(500).send({'msg' : 'server error', 'code' : -500 })
    }

})
module.exports = router