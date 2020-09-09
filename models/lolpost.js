const { Model, DataTypes } = require('sequelize')


module.exports = class LoLPost extends Model {
    static initialize(sequelize) {
        return super.init(
            {
                nickname : {
                    type : DataTypes.STRING(20),
                    allowNull : false,
                },
                gameMode: {
                    type: DataTypes.STRING(10),
                    allowNull: false,
                    defaultValue: 'normal',
                },
                title: {
                    type: DataTypes.STRING(30),
                    allowNull: false,
                    defaultValue: '',
                },
                startTier: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 1,
                },
                endTier: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 100,
                },
                startTime: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                headCount: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 1,
                },
                top: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 2,
                },
                jungle: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 2,
                },
                mid: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 2,
                },
                bottom: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 2,
                },
                support: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 2,
                },
                talkon: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 2,
                },
                content : {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    defaultValue: '',
                }
            },
            {
                sequelize,
                modelName: 'LoLPost',
                tableName: 'lolposts',
                // createdAt, updatedAt 자동생성
                timestamps: true,
                // deletedAt 생성 => 데이터복구를 연동
                // (NULL이면 삭제 안된거, 데이터 조회시 NULL인것만 조회됨)
                paranoid: true,
                // column명을 create_at이 아닌 createAt으로 표시
                underscored: false,
                charset: 'utf8'
            }
        )
    }

    static associate(db) {
        db.LoLPost.belongsTo(
            db.User, 
            { foreignKey: 'userId', targetKey: 'id' }
        )
        db.LoLPost.hasMany(
            db.LoLComment,
            { foreignKey: 'postId', sourceKey: 'id' }
        )
    }

}