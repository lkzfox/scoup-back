const Store = require('../models/Store')
const Promotion = require('../models/Promotion')
const PromotionType = require('../models/PromotionType')
const { sucessResponse } = require('../factories/responseFactory')
const catchError = require('../utils/catchError')

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
            includes: PromotionType
        }
    })
    return sucessResponse(res, 200, store)
})