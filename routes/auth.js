const router = require('express').Router();
const social_auth = require('../controllers/auth/social_auth');

// post 안에서 전부 처리
// 보내주는 값 => headers.Authorization = accesstoken || usertoken
// body에 nickname 필드가 있으면 회원가입, 없으면, 로그인

// 유저 삭제 및 업데이트 요청
// url => '/auth'
router.delete('/')
router.update('/')


// 유저 생성 및 회원 정보 요청, social auth
// url => '/auth/${social_name}'
router.post('/kakao', social_auth.authKakao);
router.post('/google', social_auth.authGoogle);
router.post('/naver', social_auth.authNaver);


module.exports = router;