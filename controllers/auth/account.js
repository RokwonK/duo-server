'use strict'

const { User } = require('../../models')

// User 확인
exports.confirmAccount = async (req, res, next) => {
    const userToken = req.headers.authorization;
    const { userId } = req.body;

    try {
        const exist_user = await User.findOne({where : {userToken, id : userId}});
        
        if (exist_user) return next();
        return res.status(400).send({'msg' : 'wrong user', 'code' : -400});
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({'msg' : 'error', 'code' : -500});
    }

}


// User 삭제
exports.deleteAccount = async (req, res, next) => {
    const userToken = req.headers.authorization;

    try {
        await User.destroy({where : {userToken}})
        return res.send({'msg' : 'success', 'code' : 1});
    }
    catch(err) {
        console.log(err)
        return res.status(500).send({'msg' : 'error', 'code' : -500});
    }
    
}

// User 업데이트 (닉네임)
exports.updateAccount = async (req, res, next) => {
    const userToken = req.headers.authorization;

    try {
        await User.update(
            {nickname : req.body.nickname},
            {where : {userToken}}
        )
        return res.send({'msg' : 'success', 'code' : 1});
    }
    catch(err) {
        console.log(err)
        return res.status(500).send({'msg' : 'error', 'code' : -500});
    }
}

