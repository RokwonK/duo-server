const router = require('express').Router()
const { User } = require('../../models')

// 인가된 사용자 확인하고 next()
router.use('/' ,  async (req, res, next) => {
    const { userId, userNickname } = req.body;
    try {
        const authorizedUser = await User.findOne({
            where : {
                id : userId,
                nickname : userNickname
            }
        })
        console.log(authorizedUser)
        if (!authorizedUser) throw 'bad user'
        else next()
    }
    catch(err) {
        if (err === 'bad user')
            res.status(412).send({ 'msg': 'bad user', 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }

})


// '/post/lol'
router.use('/lol', require('./lol'))

// '/post/mypost'
router.use('/mypost', require('./mypost'))

// // '/post/overwatch'
// router.use('/overwatch', require('./overwatch'))

// // '/post/battleground'
// router.use('/battleground', require('./battleground'))

module.exports = router