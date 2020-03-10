const { SZ, sequelize } = require('../connection')

class User extends SZ.Model {}

User.init({
    id: {
        type: SZ.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: SZ.STRING,
        validate: {
            isEmail: true
        }
    },
    name: SZ.STRING,
    password: SZ.STRING,
    phone_number: SZ.STRING
}, {
    sequelize,
    tableName: 'users',
    schema: 'scoup_dev',
    timestamps: false
})

module.exports = User;