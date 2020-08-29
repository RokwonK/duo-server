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
        if (user_info === 'undefined') throw 'bad token'

        console.log(user_info.response.id);
        res.redirect(302,`/login/user_confirm/${user_info.response.id}/naver`)
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