const { AppErrorFactory } = require('../utils/error')

/**
 * Definition
 * status   | code
 * ---------|-----
 * sucess   |  1
 * error    |  0
 * invalid  | -1
 * ---------------
 */
class Response {
    constructor(status, data, message) {
        this.status = status
        this.data = data
        this.message = message
        this.sucess = status.toString().startsWith('2')
    }
}

exports.responseFactory = (status, data, message = '') => new Response(status, data, message)

exports.sucessResponse = (res, statusCode, data, message = '') => {
    const response = new Response(statusCode, data, message)
    res.status(statusCode).json(response)
}

exports.errorResponse = (next, statusCode, message = '') => {
    next(AppErrorFactory(statusCode, message))
}