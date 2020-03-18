const { sequelize } = require('../connection')
const Promotion = require('../models/Promotion')
const PromotionType = require('../models/PromotionType')
const Card = require('../models/Card')
const CardHistory = require('../models/CardHistory')
const { sucessResponse } = require('../factories/responseFactory')
const catchError = require('../utils/catchError')

exports.getPromotions = catchError(async (req, res, next) => {
    const promotions = await Promotion.findAll({
        where: {
            id_store: req.params.id_store
        },
        include: PromotionType
    })
    return sucessResponse(res, 200, promotions)
})

exports.createPromotion = catchError(async (req, res, next) => {
    const promotion = await Promotion.create({...req.body, id_store: req.params.id_store});
    return sucessResponse(res, 201, promotion, 'Promotion successfuly created')
})

exports.getPromotion = catchError(async (req, res, next) => {
    const promotion = await Promotion.findByPk(req.params.id, {
        include: PromotionType
    })
    return sucessResponse(res, 200, promotion)
})

exports.addValue = catchError(async (req, res, next) => {
    let { id_customer, value } = req.body
    const id_promotion = req.params.id_promotion
    value = parseFloat(value);

    let card = await Card.findOne({
        where: {
            id_promotion,
            id_customer
        }
    })
    
    await sequelize.transaction(async transaction => {
        
        let value_before = 0;
        if (!card) {
            card = await Card.create({
                id_customer,
                id_promotion,
                value
            }, { transaction })
        } else {
            value_before = card.valueFloat;
            card = await card.update({
                value: value + card.valueFloat
            }, { transaction })
        }

        await CardHistory.insertHistory(card.id, req._current_user.id, value_before, card.valueFloat, transaction)
        
    
        return sucessResponse(res, 200, card)

    })
})


exports.removeValue = catchError(async (req, res, next) => {

    let { id_customer, value } = req.body
    const id_promotion = req.params.id_promotion
    value = parseFloat(value);

    let card = await Card.findOne({
        where: {
            id_promotion,
            id_customer
        }
    })

    await sequelize.transaction( async transaction => {
        const value_before = card.valueFloat

        card = await card.update({
            value: card.valueFloat - value
        }, { transaction })

        await CardHistory.insertHistory(card.id, req._current_user.id, value_before, card.valueFloat, transaction)

    })

    return sucessResponse(res, 200, card)
})