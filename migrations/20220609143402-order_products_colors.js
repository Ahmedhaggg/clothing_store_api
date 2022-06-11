'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('order_products_colors', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      size: {
        type: Sequelize.ENUM,
        values: ["sm", "md", "l", "sl", "xl", "xx", "3x"],
        allowNull: false
      },
      quantity: {
        type: Sequelize.TINYINT,
        allowNull: false
      },
      orderProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'order_products',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      productColorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product_colors',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('order_products_colors');
  }
};
