'use strict'

const router = require('express').Router();
const { LoLPost } = require('../../../models')

// '/post/lol/deletepost'
router.post('/', async (req, res) => {
    //console.log('delete post')
    if (req === 'undefined') throw 'bad access'

    const postid = req.body.id
    try {
        LoLPost.destroy({ where: { id: postid } })
        res.send({'msg' : 'delete success'});
    }
    catch (err) {
        if (err === 'bad access')
            res.status(412).send({ 'msg': 'bad token', 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }

})

module.exports = router;