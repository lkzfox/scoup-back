const { SZ, sequelize } = require('../connection')

class Card extends SZ.Model {
    get valueFloat() {
        return parseFloat(this.value)
    }
}

Card.init({
    id: {
        type: SZ.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_customer: { 
        type: SZ.INTEGER,
        allowNull: false
    },
    id_promotion: { 
        type: SZ.INTEGER,
        allowNull: false
    },
    value: SZ.DECIMAL(8,2),
    goals_achieved: SZ.INTEGER   
}, {
    sequelize,
    tableName: 'cards',
    modelName: 'card',
    schema: 'scoup_dev',
    timestamps: false
})

module.exports = Card;