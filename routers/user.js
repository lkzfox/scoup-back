const express = require('express')
const router = express.Router()
const { me, login, getAllUsers, createUser } = require('../controllers/user')


router
    .route('/me').get(me)

router
    .route('/login').post(login)

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

module.exports = router