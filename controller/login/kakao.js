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
        if (user_info === 'undefined') throw 'bad token'

        console.log(user_info);
        //res.send({"kakaologin":"success"})
        res.redirect(302,`/login/user_confirm/${user_info.id}/kakao`)
    }
    catch (err) {
        console.log(err)
        
        if (err === 'bad token')
            res.status(412).send({'msg' : err, 'code' : -412});
        else
            res.status(500).send({'msg' : 'server error', 'code' : -500})
    }    
})

module.exports = router;