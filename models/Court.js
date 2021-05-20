const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Court extends Model {}

Court.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hasLights: {
            type: DataTypes.BOOLEAN,
        },
        gameCount: {
            type: DataTypes.INTEGER,

        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'court',
    }
)

module.exports = Court