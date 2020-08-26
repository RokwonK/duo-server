'use strict'

const router = require('express').Router();
const fetch = require('node-fetch');
const url = "https://oauth2.googleapis.com/tokeninfo"

/*
    지호구의 구현
*/

// id_token으로 user 확인
// '/login/google'
router.post('/', async (req,res) => {
    // 사실은 idtoken
    const { accesstoken } = req.body;
    const options = {
        headers : {
            "id_token" : accesstoken
        }
    }
    console.log(accesstoken);
    const user_info = await fetch(url, options).then(data  => data.json());
    console.log(user_info);

    res.send("/login/google");
})

module.exports = router;