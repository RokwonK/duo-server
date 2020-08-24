const router = require('express').Router();

// 'login'
router.get('/', (req,res) => {
    res.send('/login');
})

// '/login/naver'
router.use('/naver', require('./naver'))
// '/login/kakao'
router.use('/kakao', require('./kakao'));
// '/login/google'
router.use('/google', require('./google'));

module.exports = router;