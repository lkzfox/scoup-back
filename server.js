require('dotenv').config()
const express = require('express')
const { sequelize, ENV_TESTS } = require('./connection')
require('./models/associations')
const errorController = require('./controllers/error')
const { AppError } = require('./utils/error')
const app = express();

app.use(express.json())

app.use('/api/v1/auth', require('./routers/auth'))
app.use('/api/v1/user', require('./routers/user'))
app.use('/api/v1/store', require('./routers/store'))
app.use('/api/v1/store/:id_store/promotion', require('./routers/promotion'))
app.use('/api/v1/customer/', require('./routers/customer'))
app.use('/api/v1/card/', require('./routers/card'))

// Middleware to handle undefined endpoints
app.use('*', (req, res, next) => {
    next(new AppError('Endpoint not available', 404))
})

// Middleware to handle errors
app.use(errorController)

const run = () => {
    sequelize.authenticate().then(() => {
        if (!ENV_TESTS)
            console.log('Banco conectado com sucesso..')
    }).catch(err => {
        console.error('Erro na conexão com banco de dados...', err)        
    })

    return app.listen(3000, () => {
        console.log('App rodando... ', 3000);
    })

}

module.exports = run();
