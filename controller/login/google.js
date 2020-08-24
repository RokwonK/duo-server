const router = require('express').Router();

// '/login/naver'
router.post('/', (req,res) => {
    res.send("/login/google");
})

module.exports = router;