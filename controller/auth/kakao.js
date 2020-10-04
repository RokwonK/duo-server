const router = require('express').Router();
const fetch = require('node-fetch');
const url = "https://kapi.kakao.com/v1/user/access_token_info"
const { User } = require('../../models')
const jwt = require('jsonwebtoken');


// '/auth/kakao'
// 유저 생성 or 유정 정보 읽기
router.post('/', async (req,res) => {
    const { accesstoken } = req.headers.authorization;
    const { nickname } = req.body;
    const kakao_login_request_header = "Bearer " + token;
    const options = {
        headers :  {
            'Authorization' : kakao_login_request_header
        }
    }

    try {
        const user_info = await fetch(url,options).then(data => data.json());
        if (user_info === 'undefined') throw 'bad token'

        const exist_user = await User.findOne({
            where : {
                snsId : user_info.id,
                sns : 'kakao'
            }
        })

        // 이미 있는 유저
        if (!nickname || nickname === 'undefined') {
            if(exist_user) 
                return res.send({'userToken' : exist_user.userToken, 'nickname' : exist_user.nickname})
            else 
                return res.status(400).send({'msg' : 'wrong access', 'code' : -401})
        }
        // 회원가입 요청
        else {
            if (exist_user)
                return res.status(400).send({ 'msg' : 'exist user', 'code' : -401});
            
            const jsontoken = jwt.sign({
                id : user_info.id,
                nick : 'kakao'
            },process.env.JWT_SECRET, {
                expiresIn : '1h',
                issuer : '토큰발급자'
            });

            const user_created = await User.create({
                snsId : user_info.id,
                sns : 'kakao',
                nickname : nickname,
                userToken : jsontoken
            })

            return res.send({'userToken' : user_created.userToken, 'nickname' : user_created.nickname})
        }
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