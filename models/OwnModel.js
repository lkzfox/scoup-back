const { SZ } = require('../connection')

module.exports = class OwnModel extends SZ.Model {
    static _timezone = -1 * 3 * 60 * 60 * 1000

    static _init(obj, sequelize_options) {
        for(const field in obj) {
            const options = obj[field]
            if (options.hasOwnProperty('noTZ')) {
                options['get'] = function () {
                    if (this.getDataValue(field))
                        return new Date(this.getDataValue(field).getTime() + OwnModel._timezone);
                    return null
                }
            }
        }
        
        this.init(obj, sequelize_options)

    }
}
