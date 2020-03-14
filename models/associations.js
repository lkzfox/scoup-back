const User = require('./User')
const Store = require('./Store')
const PromotionType = require('./PromotionType')
const Promotion = require('./Promotion')

module.exports = (() => {

    Store.belongsTo(User, { foreignKey: 'id_user' })
    Store.hasMany(Promotion, { foreignKey: 'id_store' })
    
    User.hasMany(Store, { foreignKey: 'id_user' })

    PromotionType.hasMany(Promotion, { foreignKey: 'id_promotion_type' })

    Promotion.belongsTo(PromotionType, { foreignKey: 'id_promotion_type' })
    Promotion.belongsTo(Store, { foreignKey: 'id_store' })


    // Promotion.sync({ force: true })
})();

