'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('inventories', { 
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
      size: {
          type: Sequelize.ENUM,
          values: ["sm", "md", "l", "sl", "xl", "xx", "3x"],
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
      colorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product_colors',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('inventories');
  }
};
