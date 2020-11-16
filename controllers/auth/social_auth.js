'use strict'

const fetch = require('node-fetch');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const { User } = require('../../models')

const google_url = "https://oauth2.googleapis.com/tokeninfo"
const kakao_url = "https://kapi.kakao.com/v1/user/access_token_info"
const naver_url = "https://openapi.naver.com/v1/nid/me";



// Google 로그인 및 회원가입
exports.authGoogle = async (req, res, next) => {
    
    const accesstoken = req.headers.authorization;
    const { nickname } = req.body;
    
    const options = {"id_token" : accesstoken}
    const query = '?' + querystring.stringify(options);
    
    try {
        // social에서 유저정보 가져오기
        const user_info = await fetch(google_url+query).then(data  => data.json());
        if (user_info.sub === 'undefined' || !user_info.sub) throw 'bad token'
        console.log(user_info.sub);


        // 유저가 우리 디비안에 존재하는지 확인
        const exist_user = await User.findOne({
            where : {
                snsId : user_info.sub,
                sns : 'google'
            }
        })

        // 이미 있는 유저
        if (!nickname || nickname === 'undefined') {
            if(exist_user) 
                return res.send({'userToken' : exist_user.userToken, 'nickname' : exist_user.nickname, 'userId' : exist_user.id})
            else 
                return res.status(400).send({'msg' : 'wrong access', 'code' : -401})
        }
        // 회원가입 요청
        else {
            // 회원가입 요청인데 이미 있는 유저일시
            if (exist_user)
                return res.status(400).send({ 'msg' : 'exist user', 'code' : -401});
            
            // user token 생성해주기
            const jsontoken = jwt.sign({
                id : user_info.sub,
                nick : 'google'
            },"rlafhrdnjscjswo", {
                expiresIn : '1h',
                issuer : 'rokwon'
            });

            // 유저 생성 후 토큰과 닉네임 보내주기
            const user_created = await User.create({
                snsId : user_info.sub,
                sns : 'google',
                nickname : nickname,
                userToken : jsontoken
            })

            return res.send({'userToken' : user_created.userToken, 'nickname' : user_created.nickname, 'userId' : user_created.id})
        }
   
    }
    catch(err) {
        console.log(err)
        
        if (err === 'bad token')
            res.status(412).send({'msg' : err, 'code' : -412});
        else
            res.status(500).send({'msg' : 'server error', 'code' : -500})
    }
}



// kakao 로그인 및 회원가입
exports.authKakao = async (req,res, next) => {
    const accesstoken = req.headers.authorization;
    const { nickname } = req.body;
    const kakao_login_request_header = "Bearer " + accesstoken;
    const options = {
        headers :  {
            'Authorization' : kakao_login_request_header
        }
    }

    try {
        const user_info = await fetch(kakao_url,options).then(data => data.json());
        if (user_info.id === 'undefined' || !user_info.id) throw 'bad token'
        console.log(user_info.id)
        

        const exist_user = await User.findOne({
            where : {
                snsId : user_info.id,
                sns : 'kakao'
            }
        })

        // 이미 있는 유저
        if (!nickname || nickname === 'undefined') {
            if(exist_user) 
                return res.send({'userToken' : exist_user.userToken, 'nickname' : exist_user.nickname, 'userId' : exist_user.id})
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
            },"rlafhrdnjscjswo", {
                expiresIn : '1h',
                issuer : 'rokwon'
            });

            const user_created = await User.create({
                snsId : user_info.id,
                sns : 'kakao',
                nickname : nickname,
                userToken : jsontoken
            })

            return res.send({'userToken' : user_created.userToken, 'nickname' : user_created.nickname, 'userId' : user_created.id})
        }
    }
    catch (err) {
        console.log(err)
        if (err === 'bad token')
            res.status(412).send({'msg' : err, 'code' : -412});
        else
            res.status(500).send({'msg' : 'server error', 'code' : -500})
    }

}



// naver 로그인 및 회원가입
exports.authNaver = async (req, res, next) => {
    const accesstoken = req.headers.authorization;
    const { nickname } = req.body;
    const naver_login_request_header = "Bearer " + accesstoken;
    const options = {
        headers :  {
            'Authorization' : naver_login_request_header
        }
    }

    try {
        const user_info = await fetch(naver_url,options).then(data => data.json());
        if (user_info.response.id === 'undefined' || !user_info.response.id) throw 'bad token'
        console.log(user_info.response.id);

        const exist_user = await User.findOne({
            where : {
                snsId : user_info.response.id,
                sns : 'naver'
            }
        })

        // 이미 있는 유저
        if (!nickname || nickname === 'undefined') {
            if(exist_user) 
                return res.send({'userToken' : exist_user.userToken, 'nickname' : exist_user.nickname, 'userId' : exist_user.id})
            else 
                return res.status(400).send({'msg' : 'wrong access', 'code' : -401})
        }
        // 회원가입 요청
        else {
            if (exist_user)
                return res.status(400).send({ 'msg' : 'exist user', 'code' : -401});
            
            const jsontoken = jwt.sign({
                id : user_info.response.id,
                nick : 'naver'
            },"rlafhrdnjscjswo", {
                expiresIn : '1h',
                issuer : 'rokwon'
            });

            const user_created = await User.create({
                snsId : user_info.response.id,
                sns : 'naver',
                nickname : nickname,
                userToken : jsontoken
            })

            return res.send({'userToken' : user_created.userToken, 'nickname' : user_created.nickname, 'userId' : user_created.id})
        }

    }
    catch(err) {
        console.log(err)
        if (err === 'bad token')
            res.status(412).send({'msg' : err, 'code' : -412});
        else
            res.status(500).send({'msg' : 'server error', 'code' : -500})
    }
}