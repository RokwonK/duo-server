'use strict'

const router = require('express').Router();
const login = require('./login');
//전체 라우터 통제하는 구간


// '/login
router.use('/login', login)
router.get('/', (req,res) => {
    res.send('Welcome');
})

module.exports = router;