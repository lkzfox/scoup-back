const Sequelize = require('sequelize');

exports.sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_ENV}`)
exports.SZ = Sequelize;