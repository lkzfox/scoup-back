const Promotion = require('../models/Promotion')
const PromotionType = require('../models/PromotionType')
const Card = require('../models/Card')
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

    if (!card) {
        card = await Card.create({
            id_customer,
            id_promotion,
            value
        })
    } else {
        card = await card.update({
            value: value + card.valueFloat
        })
    }

    return sucessResponse(res, 200, card)
})