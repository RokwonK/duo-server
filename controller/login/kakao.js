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
        console.log(user_info);
        console.log(user_info.id)
        res.send({"kakaologin":"success"})
        //res.redirect(302,`/login/user_confirm/${user_info.id}/kakao`)
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

module.exports = router;