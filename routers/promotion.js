const express = require('express')
const router = express.Router({ mergeParams: true })
const { getPromotions, createPromotion, getPromotion, addValue } = require('../controllers/promotion')
const { protect } = require('../controllers/auth')

router
    .route('/')
    .get(protect, getPromotions)
    .post(protect, createPromotion)

router
    .route('/:id')
    .get(protect, getPromotion)

router
    .route('/:id/value')
    .post(protect, addValue)
    

module.exports = router