const Card = require('../models/Card')
const CardHistory = require('../models/CardHistory')
const Promotion = require('../models/Promotion')
const PromotionType = require('../models/PromotionType')
const Store = require('../models/Store')
const { sucessResponse, errorResponse } = require('../factories/responseFactory')
const catchError = require('../utils/catchError')

exports.getCard = catchError(async (req, res, next) => {
    const card = await Card.findByPk(req.params.id, {
        include: [{
            model: Promotion,
            include: [PromotionType, Store]
        }, CardHistory],
        order: [
            [CardHistory, 'date', 'DESC']
        ]
    })

    if (!card)
        return errorResponse(next, 404, 'Card not found')

    return sucessResponse(res, 200, card)
})