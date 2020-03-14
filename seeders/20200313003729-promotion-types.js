'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('promotion_types', [
			{
				name: 'Quantidade',
				is_value: false,
				is_amount: true
			},
			{
				name: 'Valor',
				is_value: true,
				is_amount: false
			},
		], {});
	},

	down: (queryInterface, Sequelize) => {
	return queryInterface.bulkDelete('promotion_types', null, {});
	}
};
