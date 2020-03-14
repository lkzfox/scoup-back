const express = require('express')
const router = express.Router()
const { getUserStores, createStore, getStore } = require('../controllers/store')
const { protect } = require('../controllers/auth')

router
    .route('/')
    .get(protect, getUserStores)
    .post(protect, createStore)

router
    .route('/:id')
    .get(protect, getStore)

module.exports = router