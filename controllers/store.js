const Store = require('../models/Store')
const Card = require('../models/Card')
const Customer = require('../models/Customer')
const User = require('../models/User')
const CardHistory = require('../models/CardHistory')
const Promotion = require('../models/Promotion')
const PromotionType = require('../models/PromotionType')
const { sucessResponse } = require('../factories/responseFactory')
const catchError = require('../utils/catchError')
const filterModel = require('../utils/filterModel')
const { sequelize } = require('../connection')

exports.getUserStores = catchError(async (req, res, next) => {
    const stores = await Store.findAll({
        where: {
            id_user: req._current_user.id
        }
    })
    return sucessResponse(res, 200, stores)
})

exports.createStore = catchError(async (req, res, next) => {
    const store = await Store.create({...req.body, id_user: req._current_user.id});
    return sucessResponse(res, 201, store, 'Store successfuly created')
})

exports.getStore = catchError(async (req, res, next) => {
    const store = await Store.findByPk(req.params.id, {
        include: { 
            model: Promotion,
            include: PromotionType
        }
    })
    return sucessResponse(res, 200, store)
})

exports.getCards = catchError(async (req, res, next) => {

    const user_operation = filterModel(User,
        [
            {
                lf: 'user_name',
                qry: sequelize.where(sequelize.fn('unaccent_string', sequelize.col('card_histories->User.name')), 'ilike', sequelize.fn('unaccent_string', '%user_name%'))
            }
        ],
        req.query)

    const card_filter = filterModel(
        {
            model: CardHistory,
            include: user_operation,
        }, 
        [
            {
                lf: 'start_date', qry: { field: 'date', op: 'gte' }
            },
            {
                lf: 'end_date', qry: { field: 'date', op: 'lt' }
            }
        ], 
        req.query)

    const customer_filter = filterModel(Customer, 
        [{ 
            lf: 'customer', 
            qry: sequelize.where(sequelize.fn('unaccent_string', sequelize.col('customer.name')), 'ilike', sequelize.fn('unaccent_string', '%customer%'))
        }],
        req.query)
    
    let cards = await Card.findAll({
        include: [
            { 
                model: Promotion,
                include: PromotionType,
            }, card_filter, customer_filter
        ],
    })

    return sucessResponse(res, 200, cards)
})