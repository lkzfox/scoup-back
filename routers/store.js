const express = require('express')
const router = express.Router()
const { getUserStores, createStore } = require('../controllers/store')
const { protect } = require('../controllers/auth')

router
    .route('/')
    .get(protect, getUserStores)
    .post(protect, createStore)

module.exports = router