const { SZ, sequelize } = require('../connection')

class PromotionType extends SZ.Model {}

PromotionType.init({
    id: {
        type: SZ.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: SZ.STRING,
    is_value: SZ.BOOLEAN,
    is_amount: SZ.BOOLEAN
}, {
    sequelize,
    tableName: 'promotion_types',
    modelName: 'promotion_type',
    schema: 'scoup_dev',
    timestamps: false
})

module.exports = PromotionType;