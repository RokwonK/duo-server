const router = require('express').Router()

// 인가된 사용자 확인하고 next()
router.use('/' ,  /* 인가된 사용자 확인*/ )


// '/post/lol'
router.use('/lol', require('./lol'))

// '/post/mypost'
router.use('/mypost', require('./mypost'))

// // '/post/overwatch'
// router.use('/overwatch', require('./overwatch'))

// // '/post/battleground'
// router.use('/battleground', require('./battleground'))

module.exports = router