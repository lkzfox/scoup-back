const { SZ, sequelize } = require('../connection')
const OwnModel = require('./OwnModel')

class Promotion extends OwnModel {}

Promotion._init({
    id: {
        type: SZ.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_store: { 
        type: SZ.INTEGER,
        allowNull: false
    },
    id_promotion_type: { 
        type: SZ.INTEGER,
        allowNull: false
    },
    name: SZ.STRING,
    description: SZ.STRING,
    start_date: {
        type: SZ.DATE,
        allowNull: false,
        noTZ: true
    },
    finish_date: {
        type: SZ.DATEONLY,
        noTZ: true
    },
    goal: {
        type: SZ.DECIMAL(8,2),
        allowNull: false
    }

}, {
    sequelize,
    tableName: 'promotions',
    modelName: 'promotion',
    schema: 'scoup_dev',
    timestamps: false
})

module.exports = Promotion;