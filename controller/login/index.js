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

// '/login/user_confirm'
router.use('/user_confirm', require('./user_confirm'))

// '/login/set_nickname
router.use('/set_nickname', require('./set_nickname'))


// logout은 X - client에서 자신의 ac,rf 들을 지워버리면 됨

module.exports = router;