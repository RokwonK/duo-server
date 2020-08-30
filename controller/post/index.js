const router = require('express').Router()

// '/post/lol'
router.use('/lol', require('./lol'))

// // '/post/overwatch'
// router.use('/overwatch', require('./overwatch'))

// // '/post/battleground'
// router.use('/battleground', require('./battleground'))



module.exports = router