const Sequelize = require('sequelize')


module.exports = class LoLPost extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                gameMode: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                    defaultValue: '',
                },
                title: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    defaultValue: '',
                },
                startTier: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: '',
                },
                endTier: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: '',
                },
                startTime: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                    defaultValue: '',
                },
                headCount: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                top: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                jungle: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                mid: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                bottom: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                support: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
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
            { foreignKey: 'userid', targetKey: 'id'}
        )
    }

}