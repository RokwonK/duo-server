const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));

module.exports = router;