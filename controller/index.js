'use strict'

const router = require('express').Router();
const login = require('./login');
const post = require('./post');

//전체 라우터 통제하는 구간


// '/login'
router.use('/login', login)

// '/post'
router.use('/post', post)

router.get('/', (req,res) => {
    res.send('Welcome')
})


module.exports = router;