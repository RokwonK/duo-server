const { Model, DataTypes } = require('sequelize');

// users 테이블 : posts 테이블 = 1:N
module.exports = class User extends Model {
    static initialize(sequelize) {
        return super.init(
            {
                snsId : {
                    type : DataTypes.STRING(30),
                    allowNull : false
                },
                sns : {
                    type : DataTypes.STRING(20),
                    allowNull : false,
                    defaultValue : ''
                },
                nickname : {
                    type : DataTypes.STRING(20),
                    allowNull : false,
                },
                userToken : {
                    type : DataTypes.STRING(200),
                    allowNull : false
                }
            },
            {
                sequelize,
                modelName : 'User',
                tableName : 'users',
                // createdAt, updatedAt 자동생성
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
        db.User.hasMany(
            db.LoLPost,
            { foreignKey: 'userToken', sourceKey: 'userToken' }
        )
        db.User.hasMany(
            db.LoLComment,
            { foreignKey: 'userToken', sourceKey: 'userToken' }
        )
    }
}