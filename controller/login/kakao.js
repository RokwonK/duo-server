const router = require('express').Router();

// '/login/kakao'
router.post('/', (req,res) => {
    res.send("/login/kakao");
})

module.exports = router;