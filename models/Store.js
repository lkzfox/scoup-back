const { SZ, sequelize } = require('../connection')

class Store extends SZ.Model {}

Store.init({
    id: {
        type: SZ.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: SZ.STRING,
    id_user: SZ.INTEGER
}, {
    sequelize,
    tableName: 'stores',
    modelName: 'stores',
    schema: 'scoup_dev',
    timestamps: false
})

module.exports = Store;