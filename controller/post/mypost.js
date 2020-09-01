'use strict'

const router = require('express').Router();
const fetch = require('node-fetch');

// '/post/mypost'
router.post('/', async (req,res) => {
    const a = {}
    const {gameMode,c,d,e,g} = req.body

    if (gameMode !== 'all') a.gameMode = gameMode;
    

})

module.exports = router;
