
const router = require('express').Router();
const account = require('../controllers/auth/account');
const lolpost = require('../controllers/post/lolpost');

/*#################
    Post관련 CURD
###################*/


// '/post' base
// lolpost 관련 crud
router.get('/lol', lolpost.getlolPost);
router.post('/lol', account.confirmAccount, lolpost.addlolPost)
router.delete('/lol', account.confirmAccount, lolpost.deletelolPost)
router.put('/lol', account.confirmAccount, lolpost.updatelolPost);

// fitering 해서 가져오는 데이터
router.get('/lol/filter', lolpost.FilterlolPost);
// 내 포스트 가져오기
router.get('/me', lolpost.getMyPost);


module.exports = router;