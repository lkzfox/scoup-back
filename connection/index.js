const Sequelize = require('sequelize');
const { development, tests, production } = require('../config/config')

let ENVIRONMENT, ENV_TESTS, ENV_PROD, ENV_DEV;

if (process.env.NODE_ENV == 'tests') {
    console.info('RUNNING ON TESTS ENVIROIMENT')
    ENVIRONMENT = tests
    ENV_TESTS = true
} else if (process.env.NODE_ENV == 'production') {
    console.warn('RUNNING ON PRODUCTION ENVIROIMENT')
    ENVIRONMENT = production
    ENV_PROD = true
} else {
    console.info('RUNNING ON DEVELOPMENT ENVIROIMENT')
    ENVIRONMENT = development
    ENV_DEV = true
}

exports.sequelize = new Sequelize(ENVIRONMENT.url(), {
    timezone: '-03:00',
    logging: process.env.NODE_ENV == 'production'
})
exports.SZ = Sequelize;

exports.ENV_DEV = ENV_DEV
exports.ENV_TESTS = ENV_TESTS
exports.ENV_PROD = ENV_PROD