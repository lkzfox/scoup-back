const express = require('express')
const router = express.Router()
const { getUserStores, createStore, getStore, getCards } = require('../controllers/store')
const { protect } = require('../controllers/auth')

router
    .route('/')
    .get(protect, getUserStores)
    .post(protect, createStore)

router
    .route('/:id')
    .get(protect, getStore)

router
    .route('/:id_store/cards')
    .get(protect, getCards)

module.exports = router