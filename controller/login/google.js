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
    
    try {
        const user_info = await fetch(url+query).then(data  => data.json());
        if (user_info === 'undefined') throw 'bad token'

        console.log(user_info)
        // res.send("/login/google");
        res.redirect(302,`/login/user_confirm/${user_info.sub}/google`)
    }
    catch(err) {
        console.log(err)
        
        if (err === 'bad token')
            res.status(412).send({'msg' : err, 'code' : -412});
        else
            res.status(500).send({'msg' : 'server error', 'code' : -500})
    }

})

module.exports = router;
