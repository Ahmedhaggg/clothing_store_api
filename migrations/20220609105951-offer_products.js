'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('offer_products', { 
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
      offerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'offers',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('offer_products');
  }
};
