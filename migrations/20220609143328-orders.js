'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: ["received", "shipped", "completed"],
        defaultValue: "received"
      }, 
      paymentId: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      amount: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'addresses',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('orders');
  }
};
