'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('order_products', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      quantity: {
        type: Sequelize.TINYINT,
        allowNull: false
      },
      pricePerUnit: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false
      },
      totalPrice: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('order_products');
  }
};
