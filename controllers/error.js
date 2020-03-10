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

const sendProdError = (err, res) => {
    
    if (!err.isAppError) {
        printLogError(err);      
        err.message = 'Something went wrong'
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
