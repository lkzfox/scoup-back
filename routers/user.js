const express = require('express')
const router = express.Router()
const { me, getAllUsers, createUser } = require('../controllers/user')
const { protect } = require('../controllers/auth')


router
    .route('/me').get(me)

router
    .route('/')
    .get(protect, getAllUsers)
    .post(protect, createUser)

module.exports = router