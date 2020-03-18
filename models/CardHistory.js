const { SZ, sequelize } = require('../connection')

class CardHistory extends SZ.Model {
    static async insertHistory(id_card, id_user_operation, value_before, value_after, transaction) {
        await CardHistory.create({
            id_card,
            id_user_operation,
            value_before,
            value_after
        }, { transaction })
    }

}

CardHistory.init({
    id: {
        type: SZ.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_card: { 
        type: SZ.INTEGER,
        allowNull: false
    },
    id_user_operation: { 
        type: SZ.INTEGER,
        allowNull: false
    },
    value_before: SZ.DECIMAL(8,2),
    value_after: SZ.DECIMAL(8,2),
    date: {
        type: SZ.DATE,
        defaultValue: SZ.NOW
    }   
}, {
    sequelize,
    tableName: 'cards_history',
    modelName: 'card_history',
    schema: 'scoup_dev',
    timestamps: false
})

module.exports = CardHistory;