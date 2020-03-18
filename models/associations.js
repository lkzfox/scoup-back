const User = require('./User')
const Store = require('./Store')
const PromotionType = require('./PromotionType')
const Promotion = require('./Promotion')
const Card = require('./Card')
const CardHistory = require('./CardHistory')
const Customer = require('./Customer')

module.exports = (() => {

    Store.belongsTo(User, { foreignKey: 'id_user' })
    Store.hasMany(Promotion, { foreignKey: 'id_store' })
    
    User.hasMany(Store, { foreignKey: 'id_user' })

    PromotionType.hasMany(Promotion, { foreignKey: 'id_promotion_type' })

    Promotion.belongsTo(PromotionType, { foreignKey: 'id_promotion_type' })
    Promotion.belongsTo(Store, { foreignKey: 'id_store' })
    Promotion.hasMany(Card, { foreignKey: 'id_promotion' })

    Card.belongsTo(Customer, { foreignKey: 'id_customer' })
    Card.belongsTo(Promotion, { foreignKey: 'id_promotion' })
    Card.hasMany(CardHistory, { foreignKey: 'id_card' })

    CardHistory.belongsTo(Card, { foreignKey: 'id_card' })

    Customer.hasMany(Card, { foreignKey: 'id_customer' })

    // Promotion.sync({ force: true })
})();

