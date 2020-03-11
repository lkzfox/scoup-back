const bcrypt = require('bcrypt')
const User = require('../models/User')
const { sucessResponse } = require('../factories/responseFactory')
const catchError = require('../utils/catchError')

exports.me = (req, res) => {
    res.json('ME')
}

exports.getAllUsers = catchError(async (req, res, next) => {
    const users = await User.findAll();
    return sucessResponse(res, 200, users)
})

exports.createUser = catchError(async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 13)
    const user = await User.create(req.body);
    return sucessResponse(res, 201, user)
})