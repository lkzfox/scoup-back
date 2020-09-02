require('dotenv').config()

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres",
        url() { return `${this.dialect}://${this.username}:${this.password}@${this.host}/${this.database}` }
    },
    tests: {
        username: process.env.DB_USER_TESTS,
        password: process.env.DB_PASSWORD_TESTS,
        database: process.env.DB_NAME_TESTS,
        host: process.env.DB_HOST_TESTS,
        port: process.env.DB_PORT_TESTS,
        dialect: "postgres",
        url() { return `${this.dialect}://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}` }
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,

    }
};