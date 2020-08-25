const router = require('express').Router();
const fetch = require('node-fetch');
const url = "https://kapi.kakao.com/v1/user/access_token_info"


// '/login/kakao'
// user 정보 받고 => user확인으로 redirect (상태코드 = 302)
router.post('/', async (req,res) => {
    const { accesstoken } = req.body;
    const kakao_login_request_header = "Bearer " + accesstoken;
    const options = {
        headers :  {
            'Authorization' : kakao_login_request_header
        }
    }

    try {
        const user_info = await fetch(url,options).then(data => data.json());
        res.redirect(302,`/login/user_confirm/${user_info.id}/kakao`)
    }
    catch (err) {
        console.log(err)
        
        // 1. accesstoken의 유효기간이 지났을 경우 => 프론트 단에서 처리해아함 
        // 2. 잘못된 accesstoken일 경우 => 권한없음(인증이 안됨)
        res.status(401).send({"token_info" : "need "})
        // 3. kakao api 문제 => 500
        res.status(500),send({"token_info" : "server error"})
    }    
})

// 프론트가 할 일 
// 
// 
// 첫 로그인
// 1. 갱신토큰,액세스토큰 받아오기
// 2. 액세스토큰을 우리서버로 보내 로그인
// 3. 액세스토큰/갱신토큰을 폰 데이터베이스에 저장(영구적 저장)
//
//
// 자동 로그인 => 
// 1. view가 load 될때 저장된 액세스토큰 확인
//      - 없으면 자동 로그인 안됨
// 2. 액세스토큰 만료일이 지났으면 갱신토큰으로 더 늘리기
//      - 갱신토큰 만료일 지났으면 자동로그인 안됨(약 1,2달에 한번씩은 자동로그인 풀림)
// 3. 액세스토큰 우리서버로 보내 로그인 확인 응답 보낼거
// 
// 존나 중요한거, 병신같은 사용자 == 김형호 같은 애들이 데이터 사용 안하고 있어서
// 네트워크 통신을 못할 수도 있음 예외로 처리해놔야함

module.exports = router;