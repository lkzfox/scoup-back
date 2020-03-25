const { SZ } = require('../connection')
/**
 * 
 * @param {SequelizeModel || Object} model - Selquelize Model or an object
 * @param {Array} filters - Array of filters
 * @param {Object} search - Object wich may contains the seached data
 */

const filterModel = (model, filters, search) => {
    const new_model  = {
        model: model.model || model,
    }

    if (model.include)
        new_model.include = model.include

    let where = [];

    for(let i = 0; i < filters.length; i++) {
        let filter_item = filters[i]
        let search_item = search[filter_item.lf]
        if (!search_item) continue
        if (filter_item.qry.logic) {
            filter_item.qry.logic.args.forEach((arg, i) => { 
                filter_item.qry.logic.args[i] = arg.replace(filter_item.lf, search_item)
            })
        } else {
            let {field, op} = filter_item.qry
            filter_item.qry = {
                [field]: { [SZ.Op[op]]: search_item }
            }
        }

        where.push(filter_item.qry)
    }

    new_model.where = where

    return new_model
}

module.exports = filterModel