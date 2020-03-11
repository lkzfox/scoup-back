const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { sucessResponse, errorResponse } = require('../factories/responseFactory')
const catchError = require('../utils/catchError')

exports.login = catchError(async (req, res, next) => {
    let { email, password } = req.body;

    const user = await User.findOne({ where: { email } })
    const pass = await bcrypt.compare(password, user.password);    
    
    if (!user || !pass) {
        return errorResponse(next, 401, 'Invalid credentials')
    }

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFE })
    return sucessResponse(res, 200, token)
})

exports.protect = catchError(async (req, res, next) => {
    
    if (!req.headers.authorization) {
        return errorResponse(next, 401, 'No token provided')
    }

    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    
    const user = await User.findByPk(payload.id)
    if (!user) {
        return errorResponse(next, 401, 'This user no longer exists')
    }

    if (user.passwordChangedAfter(payload.iat)) {
        return errorResponse(next, 401, 'Your token is no longer valid, please login again')
    }

    req._current_user = payload
    
    next()
})