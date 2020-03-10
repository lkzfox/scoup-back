const dotenv = require('dotenv').config()
const express = require('express')
const { sequelize } = require('./connection')
const errorController = require('./controllers/error')
const AppError = require('./utils/error')
const app = express();

app.use(express.json())

app.use('/api/v1/user', require('./routers/user'))

// Middleware to handle undefined endpoints
app.use('*', (req, res, next) => {
    next(new AppError('Endpoint not available', 400))
})

// Middleware to handle errors
app.use(errorController)


sequelize
    .authenticate()
    .then(() => {
        console.log('Banco conectado com sucesso..')
    })
    .catch(err => {
        console.error('Erro na conexão com banco de dados...', err)
    });

app.listen(3000, () => {
    console.log('App rodando... ', 3000);
})