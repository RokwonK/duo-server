'use strict'

const router = require('express').Router()
const { Post } = require('../../../models')

// '/post/lol/getpost'
router.post('/', async (req, res) => {
    //console.log('get post')
    if (req === 'undefined') throw 'bad access'

    try {
        const posts = await Post.findAll()
        res.json(posts)
    }
    catch (err) {
        if (err === 'bad access')
            res.status(412).send({ 'msg': 'bad access', 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }

})

module.exports = router;