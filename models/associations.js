const User = require('./User')
const Store = require('./Store')

module.exports = (() => {

    Store.belongsTo(User, { foreignKey: 'id_user' })
    User.hasMany(Store, { foreignKey: 'id_user' })

})();

