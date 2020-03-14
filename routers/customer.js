const express = require('express')
const router = express.Router({ mergeParams: true })
const { getCustomer, createCustomer } = require('../controllers/customer')
const { protect } = require('../controllers/auth')

router
    .route('/:phone_number')
    .get(protect, getCustomer)

router
    .route('/')
    .post(protect, createCustomer)

module.exports = router