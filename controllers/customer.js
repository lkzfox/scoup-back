const Customer = require('../models/Customer')
const Card = require('../models/Card')
const Promotion = require('../models/Promotion')
const PromotionType = require('../models/PromotionType')
const Store = require('../models/Store')
const { sucessResponse, errorResponse } = require('../factories/responseFactory')
const catchError = require('../utils/catchError')

exports.getCustomer = catchError(async (req, res, next) => {
    const customer = await Customer.findOne({
        where: {
            phone_number: req.params.phone_number
        },
        include: {
            model: Card,
            include: {
                model: Promotion,
                include: [PromotionType, Store]
            }
        }
    })

    if (!customer)
        return errorResponse(next, 404, 'Customer not found')

    return sucessResponse(res, 200, customer)
})

exports.createCustomer = catchError(async (req, res, next) => {
    const customer = await Customer.create(req.body)
    return sucessResponse(res, 200, customer)
})