'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('shippings', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      startShippingAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endShippingWithin: {
        type: Sequelize.DATE,
        allowNull: false
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      shipperId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "shippers",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('shippings');
  }
};
