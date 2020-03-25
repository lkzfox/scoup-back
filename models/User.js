const { SZ, sequelize } = require('../connection')
const OwnModel = require('./OwnModel')

class User extends OwnModel {

    passwordChangedAfter(date) {
        if (this.passwordChangedAt) {
            return (this.passwordChangedAt.getTime() / 1000) > date
        }
        return false
    }
}

User._init({
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
    passwordChangedAt: {
        type: SZ.DATE,
        noTZ: true
    },
    phone_number: SZ.STRING
}, {
    sequelize,
    tableName: 'users',
    schema: 'scoup_dev',
    timestamps: false
})

module.exports = User;