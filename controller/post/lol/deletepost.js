'use strict'

const router = require('express').Router();
const { Post } = require('../../../models')

// '/post/lol/deletepost'
router.post('/', async (req, res) => {
    //console.log('delete post')
    if (req === 'undefined') throw 'bad access'

    const postid = req.body.id
    try {
        const result = await Post.destroy({ where: { id: postid } })
        res.json(result)
    }
    catch (err) {
        if (err === 'bad access')
            res.status(412).send({ 'msg': 'bad token', 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }

})

module.exports = router;