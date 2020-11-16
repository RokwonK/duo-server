'use strict'

const { LoLPost } = require('../../models');
const { Op } = require('sequelize');

/*###################
    lolpost create
####################*/
exports.addlolPost = async (req, res, next) => {
    const {
        userNickname,
        userId,
        // 게시물에 올라갈 것들
        gameMode,
        title,
        startTier,
        endTier,
        startTime,
        headCount,
        top, bottom, mid, jungle, support,
        content,
        talkon
    } = req.body;

    let value = [
        userNickname,
        userId,
        gameMode,
        title,
        startTier,
        endTier,
        startTime,
        headCount,
        top, bottom, mid, jungle, support,
        content,
        talkon
    ]

    try{
        value.forEach(v => {
            if (!v || v === 'undefined') throw 'bad prameters' 
        })

        const lolpostCreated = await LoLPost.create({
            nickname : userNickname,
            userId,
            gameMode,
            title,
            startTier,
            endTier,
            startTime,
            headCount,
            top, bottom, mid, jungle, support, // 1,2 default는 2  선택하면 1
            content,
            talkon
        });
        console.log(lolpostCreated)
        if (lolpostCreated === null) throw 'post create error'

        res.send({'msg' : 'create success'});
    }
    catch (err) {
        if (err === 'post create error' || err === 'bad prameters')
            res.status(412).send({'msg' : err, 'code' : -412});
        else 
            res.status(500).send({'msg' : 'server error', 'code' : -500});
    }
}


/*###################
    lolpost get
####################*/
exports.getlolPost = async (req, res, next) => {
    try {
        const {
            offset,
            limit
        } = req.query;

        const posts = await LoLPost.findAll({offset, limit})
        res.send(posts)
    }
    catch (err) {
        res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }
}


/*###################
    lolpost filter해서 가져오기
####################*/
exports.FilterlolPost = async (req, res, next) => {
    
    const {
        gameMode,
        headCount,
        wantTier,
        top, bottom, mid, jungle, support,
        talkon,
        offset,
        limit
    } = req.query;

    try {
        const whereOptions = {};
        const indexName = ["top", "bottom", "mid", "jungle", "support", "talkon"];
        const positionArray = [ parseInt(top), parseInt(bottom), parseInt(mid), parseInt(jungle), parseInt(support), parseInt(talkon) ];

        // find해서 일정 갯수만 보내주기, 프론트에서 화면의 끝에 다다들면 다시 개수요청
        if (gameMode !== "all") whereOptions["gameMode"] = gameMode;
        whereOptions["headCount"] = { [Op.lte] : parseInt(headCount) }
        // 자신이 포함되는 곳을 찾고 싶은 것
        whereOptions["startTier"] = { [Op.lte] : parseInt(wantTier) }
        whereOptions["endTier"] = { [Op.gte] : parseInt(wantTier) }
        
        positionArray.forEach((value, index) => {
            if (value === 3)
                whereOptions[indexName[index]] = { [Op.lte] : value}
            else
                whereOptions[indexName[index]] = value;
        })

        // 보내는 양의 갯수 제한을 둘 것인가?

        const filteringData = await LoLPost.findAll({
            where : whereOptions,
            limit,
            offset
            //order : ["starTime", "ASC"]
        })
        if (!filteringData) throw 'no data'
        
        console.log(filteringData);
        res.send(filteringData);
    }
    catch (err) {
        if (err === 'no data')
            res.status(412).send({ 'msg': err, 'code': -412 })
        else if (err === 'bad access')
            res.status(412).send({ 'msg': 'bad access', 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }

}

/*###################
    lolpost 자신의 게시글 가져오기
####################*/
exports.getMyPost = async (req, res, next) => {
    if (req === 'undefined') throw 'bad access'

    // userId(user의 id(primaryKey)인 userId)를 받아서
    // 해당 userId(foreignKey)를 가진 post출력
    const { userId } = req.query

    // overwatch, battleground 테이블은 join으로 처리 (include)
    try {
        const mypost = await LoLPost.findAll({
            where: { userId : parseInt(userId) },
        })
        res.send(mypost)
    }
    catch (err) {
        if (err === 'bad access')
            res.status(412).send({ 'msg': 'bad access', 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }

}



/*###################
    lolpost 지우기
####################*/
exports.deletelolPost = async (req, res, next) => {
    

    const {postId, userId} = req.body;
    
    try {
        await LoLPost.destroy({ where: { id: postId, userId} })

        res.send({'msg' : 'delete success'});
    }
    catch (err) {
        if (err === 'bad access' || err === 'bad delete')
            res.status(412).send({ 'msg': err, 'code': -412 })
        else
            res.status(500).send({ 'msg': 'server error', 'code': -500 })
    }
}


/*###################
    lolpost 수정하기
####################*/
exports.updatelolPost = async (req, res, next) => {
    const {
        postId,
        // 게시물에 올라갈 것들
        gameMode,
        title,
        startTier,
        endTier,
        startTime,
        headCount,
        top, bottom, mid, jungle, support,
        content,
        talkon
    } = req.body;
    let value = [
        postId,
        // 게시물에 올라갈 것들
        gameMode,
        title,
        startTier,
        endTier,
        startTime,
        headCount,
        top, bottom, mid, jungle, support,
        content,
        talkon
    ]

    try{
        value.forEach(v => {
            if (!v || v === 'undefined') throw 'bad prameters' 
        })

        await LoLPost.update({
            gameMode,
            title,
            startTier,
            endTier,
            startTime,
            headCount,
            top, bottom, mid, jungle, support,
            content,
            talkon
        },{
            where : {id : postId}
        });

        res.send({'msg' : 'update success'});
    }
    catch (err) {
        if (err === 'post create error' || err === 'bad prameters')
            res.status(412).send({'msg' : err, 'code' : -412});
        else 
            res.status(500).send({'msg' : 'server error', 'code' : -500});
    }

}
