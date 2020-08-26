const router = require('express').Router();
const fetch = require('node-fetch');
const url = "https://openapi.naver.com/v1/nid/me";

// '/login/naver'
router.post('/', async (req,res) => {
    const { accesstoken } = req.body;
    const naver_login_request_header = "Bearer " + accesstoken;
    const options = {
        headers :  {
            'Authorization' : naver_login_request_header
        }
    }

    try {
        const user_info = await fetch(url,options).then(data => data.json());
        console.log(user_info.response.id);
        res.send({"navelogin":"success"})

        //res.redirect(302,`/login/user_confirm/${user_info.id}/naver`)
    }
    catch (err) {
        console.log(err)
        
        // 1. accesstoken의 유효기간이 지났을 경우 => 프론트 단에서 처리해아함 
        // 2. 잘못된 accesstoken일 경우 => 권한없음(인증이 안됨)
        res.status(401).send({"token_info" : "need "})
        // 3. naver api 문제 => 500
        res.status(500),send({"token_info" : "server error"})
    }
})

module.exports = router;