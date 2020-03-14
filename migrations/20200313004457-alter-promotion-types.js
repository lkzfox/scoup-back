'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn({
					tableName: 'promotion_types',
					schema: 'scoup_dev'
				}, 'is_value', {
					type: Sequelize.BOOLEAN,
				}, { transaction: t }),
		        queryInterface.addColumn({
					tableName: 'promotion_types',
					schema: 'scoup_dev'
				}, 'is_amount', {
					type: Sequelize.BOOLEAN,
				}, { transaction: t }),
			])
		})
	},
	
	down: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn({
					tableName: 'promotion_types',
					schema: 'scoup_dev'
				}, 'is_value', { transaction: t }),
                queryInterface.removeColumn({
					tableName: 'promotion_types',
					schema: 'scoup_dev'
				}, 'is_amount', { transaction: t }),
            ])
        })
	}
};
