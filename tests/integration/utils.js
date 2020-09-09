const bcrypt = require('bcrypt')
const User = require("../../models/User");
const { sequelize } = require('../../connection');

exports.createUser = async (email, pwd) => {
    const user = await User.create({
        email: email || 'tests@tests.com',
        name: 'Testing',
        password: await bcrypt.hash(pwd || 'TestPassword', 13)
    })

    return user;
}

exports.checkDatabaseConnection =  () => {
    return sequelize.authenticate().then(() => {})
}

exports.clearDatabase =  () => {
    return sequelize.sync({force: true})
}



