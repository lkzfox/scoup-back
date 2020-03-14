const { SZ, sequelize } = require('../connection')

class Promotion extends SZ.Model {}

Promotion.init({
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
        allowNull: false
    },
    finish_date: SZ.DATEONLY,
    goal: {
        type: SZ.FLOAT(8,2),
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