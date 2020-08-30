const router = require('express').Router()
const ctrl = require('./postctrl')


// '/post/lol'
router.get('/', (req, res) => {
    res.send('lol!')
})

router.post('/getpost', ctrl.get_post)

router.post('/uploadpost', ctrl.post_uploadpost)

router.post('/updatepost', ctrl.post_updatepost)

router.post('/deletepost', ctrl.post_deletepost)

router.post('/mypost', ctrl.post_mypost)