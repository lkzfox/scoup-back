const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { sucessResponse, errorResponse } = require('../factories/responseFactory')
const catchError = require('../utils/catchError')

exports.me = (req, res) => {
    res.json('ME')
}

exports.login = catchError(async (req, res, next) => {
    let { email, password } = req.body;

    const user = await User.findOne({ where: { email } })
    const pass = await bcrypt.compare(password, user.password);    
    
    if (!user || !pass) {
        return errorResponse(next, 401, 'Invalid credentials')
    }

    const token = jwt.sign({user, password}, process.env.JWT_SECRET)
    return sucessResponse(res, 200, token)
})

exports.getAllUsers = catchError(async (req, res, next) => {
    const users = await User.findAll();
    return sucessResponse(res, 200, users)
})

exports.createUser = catchError(async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 13)
    const user = await User.create(req.body);
    return sucessResponse(res, 201, user)
})