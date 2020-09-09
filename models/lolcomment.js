const { Model, DataTypes } = require('sequelize');

// users 테이블 : posts 테이블 = 1:N
module.exports = class LoLComment extends Model {
    static initialize(sequelize) {
        return super.init(
            {
                nickname : {
                    type : DataTypes.STRING(20),
                    allowNull : false,
                },
                content : {
                    type : DataTypes.TEXT,
                    allowNull : false,
                }


                
            },
            {
                sequelize,
                modelName : 'LoLComment',
                tableName : 'lolcomments',

                timestamps : true,
                // deletedAt 생성 => 데이터복구를 연동
                // (NULL이면 삭제 안된거, 데이터 조회시 NULL인것만 조회됨)
                paranoid : true,
                // column명을 create_at이 아닌 createAt으로 표시
                underscored : false,
                charset : 'utf8'
            }
        )
    }
    static associate(db) {
        db.LoLComment.belongsTo(
            db.User,
            { foreignKey: 'userId', targetKey: 'id' }
        )
        db.LoLComment.belongsTo(
            db.LoLPost,
            { foreignKey: 'postId', targetKey: 'id' }
        )   
    }
}