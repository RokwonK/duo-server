const router = require('express').Router();
const fetch = require('node-fetch');


// '/login/user_confirm/'
// user Table => user_id, sns, nickname, id(unique)

// /login/user_confirm/:id/:sns
router.get('/:id/:sns', async (req,res) => {
    console.log(req.params.id, req.params.sns);
    // user Tabe 확인을 함
    //      있으면 nickname과 id를 넘겨줌 {nickname : "n", id : 123}
    //      없으면, client에다가 nickname 생성하세요 {nickname : "needNickname", id : -1 }


    
    
    

    res.send("good confirm");
})

module.exports = router;