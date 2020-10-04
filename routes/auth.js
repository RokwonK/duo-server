const router = require('express').Router();

// post 안에서 전부 처리
// 보내주는 값 => headers.Authorization = accesstoken || usertoken
// body에 nickname 필드가 있으면 회원가입, 없으면, 로그인

// 유저 삭제 및 업데이트 요청
router.delete('/')
router.update('/')


// 유저 생성 및 회원 정보 요청
// kakao auth
router.post('/kakao')

// google auth
router.post('/google')

// naver auth
router.post('/naver')




module.exports = router;