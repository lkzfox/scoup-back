const printLogError = err => {
    console.log();
    console.error('====== ERROR =====');
    console.error(err);
    console.log();
}

const sendDevError = (err, res) => {

    printLogError(err);

    res.status(err.code || 500).json({
        message: err.message,
        code: 0,
        stack: err.stack,
        err,
    })
}

const handleUniqueConstraintError = err => {
    const [field, value] = err.parent.detail.split('=')
    const cleanField = field.match(/\(.+\)/ig)[0].replace(/\(|\)/g, '')
    const cleanValue = value.match(/\(.+\)/ig)[0].replace(/\(|\)/g, '')
    return `The ${cleanField}, ${cleanValue}, is already in use`
}

const sendProdError = (err, res) => {
    
    if (!err.isAppError) {
        printLogError(err);
        switch (err.name) {
            case 'JsonWebTokenError':
                err.message = 'Invalid token, please login again.'
                break
            case 'TokenExpiredError':
                err.message = 'Expired token, please login again'
                break
            case 'SequelizeUniqueConstraintError':
                err.message = handleUniqueConstraintError(err)
                break
            default:
                err.message = 'Something went wrong'
        }
    }

    res.status(err.code || 500).json({
        message: err.message,
        status: 'error',
        code: 0
    })
}

module.exports = (err, req, res, next) => {
    
    if (process.env.NODE_ENV !== 'production') {
        sendDevError(err, res)
    } else {
        sendProdError(err, res)
    }
}
