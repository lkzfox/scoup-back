const express = require('express')
const { getCard } = require('../controllers/card')
const router = express.Router();

router
    .route('/:id')
    .get(getCard)

module.exports = router