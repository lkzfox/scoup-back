'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn({
					tableName: 'users',
					schema: 'scoup_dev'
				}, 'passwordChangedAt', {
					type: Sequelize.DATE,
				}, { transaction: t }),
			])
		})
	},
	
	down: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn({
					tableName: 'users',
					schema: 'scoup_dev'
				}, 'passwordChangedAt', { transaction: t }),
            ])
        })
	}
};
