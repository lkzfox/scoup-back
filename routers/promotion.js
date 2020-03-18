const express = require('express')
const router = express.Router({ mergeParams: true })
const { getPromotions, createPromotion, getPromotion, addValue, removeValue } = require('../controllers/promotion')
const { protect } = require('../controllers/auth')

router
    .route('/')
    .get(protect, getPromotions)
    .post(protect, createPromotion)

router
    .route('/:id')
    .get(protect, getPromotion)

router
    .route('/:id_promotion/value')
    .post(protect, addValue)
    .patch(protect, removeValue)
    

module.exports = router