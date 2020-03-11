const { SZ, sequelize } = require('../connection')

class User extends SZ.Model {

    passwordChangedAfter(date) {
        if (this.passwordChangedAt) {
            return (this.passwordChangedAt.getTime() / 1000) > date
        }
        return false
    }
}

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
    passwordChangedAt: SZ.DATE,
    phone_number: SZ.STRING
}, {
    sequelize,
    tableName: 'users',
    schema: 'scoup_dev',
    timestamps: false
})

module.exports = User;