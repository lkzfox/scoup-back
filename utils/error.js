class AppError extends Error {
    constructor(message, code) {
        super(message)
        
        this.code = code
        this.isAppError = true
        
        Error.captureStackTrace(this, this.constructor)
    }
}

exports.AppError = AppError
exports.AppErrorFactory = (code, message) => new AppError(message, code)