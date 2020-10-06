const router = require('express').Router();
const social_auth = require('../controllers/auth/social_auth');
const account = require('../controllers/auth/account');

/*#################
    유저관련 CURD
###################*/

// 유저 삭제 및 업데이트 요청
// url => '/auth'
router.delete('/',account.confirmAccount, account.deleteAccount );
router.put('/',account.confirmAccount, account.updateAccount );



// 유저 생성 및 회원 정보 요청, social auth
// url => '/auth/${social_name}'
router.post('/kakao', social_auth.authKakao);
router.post('/google', social_auth.authGoogle);
router.post('/naver', social_auth.authNaver);


module.exports = router;