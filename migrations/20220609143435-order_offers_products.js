'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('order_offers_products', { 
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
      orderOfferId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'order_offers',
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
      }
     });
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('order_offers_products');
     */
  }
};
