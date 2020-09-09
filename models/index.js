const Sequelize = require('sequelize');
const User = require('./user');
const LoLPost = require('./lolpost');
const LoLComment = require('./lolcomment');

// 배포된게 아니면 개발로 사용
const env = process.env.NODE_ENV || 'development'
const config = require( '../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host : '127.0.0.1',
        dialect : 'mysql'
    }
)

// 이제부터 db로 Sequelize에 접근
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User.initialize(sequelize)
db.LoLPost = LoLPost.initialize(sequelize)
db.LoLComment = LoLComment.initialize(sequelize);

User.associate(db)
LoLPost.associate(db)
LoLComment.associate(db)

module.exports = db;