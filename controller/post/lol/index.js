const router = require('express').Router()

// '/post/lol'
router.get('/', (req, res) => {
    res.send('lol!')
})

// '/post/lol/getpost'
router.use('/getpost', require('./getpost'));

// '/post/lol/uploadpost'
router.use('/uploadpost', require('./uploadpost'));

// '/post/lol/updatepost'
router.use('/updatepost', require('./updatepost'));

// '/post/lol/deletepost'
router.use('/deletepost', require('./deletepost'));


module.exports = router;