'use strict'

const router = require('express').Router();
const fetch = require('node-fetch');
const querystring = require('querystring');
const url = "https://oauth2.googleapis.com/tokeninfo"

/*
    지호구의 구현
*/

// id_token으로 user 확인
// '/login/google'
router.post('/', async (req,res) => {
    // 사실은 idtoken
    const { accesstoken } = req.body;
    const options = {"id_token" : accesstoken}
    const query = '?' + querystring.stringify(options);
    
    const user_info = await fetch(url+query).then(data  => data.json());
    console.log(user_info)
    console.log(user_info.sub);
    res.send("/login/google");
})

module.exports = router;
