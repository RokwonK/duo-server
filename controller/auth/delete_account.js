'use strict'


const router = require('express').Router();
const fetch = require('node-fetch')
const { User } = require('../../models')


// '/login/delete_account'
router.post('/', async (req, res) => {

    // parameter가 없으면 잘못된 접근
    if (req === 'undefined') throw 'bad access'

    const { accesstoken, sns, userId } = req.body

    try {
        const sns_url = {
            "kakao" : "https://kapi.kakao.com/v1/user/access_token_info",
            "naver" : "https://openapi.naver.com/v1/nid/me",
            "google" : "https://oauth2.googleapis.com/tokeninfo?id_token="
        }

        const options = {}
        let snsId;
        let user_info;

        if (sns === "google")
            sns_url[sns] += accesstoken;
        else
            options["headers"] = { "Authorization" : "Bearer " + accesstoken }

        // sns에서 user정보들을 가져옴
        if (sns === "google")
            user_info = await fetch(sns_url[sns]).then(data => data.json())
        else 
            user_info = await fetch(sns_url[sns], options).then(data => data.json())
        if (user_info === 'undefined') throw 'bad accesstoken'

        // 가져온 정보 중에서 snsId에 해당하는 것들만 가져옴
        if (sns === "google") snsId = user_info.sub;
        else if (sns === "naver") snsId = user_info.response.id;
        else if (sns === "kakao") snsId = user_info.id;
        else throw 'non-existent sns';

        await User.destroy({
            where: { 
                id : userId,
                snsId
            }
        })
        res.send({'msg' : 'Withdrawal success'})
    }
    catch (err) {
        if (err === 'bad access' || err === 'bad accesstoken' || err === 'non-existent sns')
            res.status(412).send({ 'msg': err, 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }

})

module.exports = router;