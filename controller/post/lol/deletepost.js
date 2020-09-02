'use strict'

const router = require('express').Router();
const { LoLPost } = require('../../../models')

// '/post/lol/deletepost'
router.post('/', async (req, res) => {
    //console.log('delete post')
    if (req === 'undefined') throw 'bad access'

    const postId = req.body.postId
    try {
        await LoLPost.destroy({ where: { id: postId } })

        res.send({'msg' : 'delete success'});
    }
    catch (err) {
        if (err === 'bad access' || err === 'bad delete')
            res.status(412).send({ 'msg': err, 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }

})

module.exports = router;