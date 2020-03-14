const { SZ, sequelize } = require('../connection')

class Customer extends SZ.Model {}

Customer.init({
    id: {
        type: SZ.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: SZ.STRING,
        allowNull: false
    },
    phone_number: {
        type: SZ.STRING,
        allowNull: false,
        unique: true
    },

}, {
    sequelize,
    tableName: 'customers',
    modelName: 'customer',
    schema: 'scoup_dev',
    timestamps: false
})

module.exports = Customer;