'use strict';

module.exports = {
 async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('addresses', 'governorateId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      reference: {
        model: "governorates",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    });
    
    await queryInterface.addColumn('addresses', 'cityId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      reference: {
        model: "cities",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('addresses', 'governorateId')
    await queryInterface.removeColumn('addresses', 'cityId')

  }
};
