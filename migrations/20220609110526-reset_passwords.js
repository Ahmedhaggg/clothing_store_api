'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reset_passwords', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      token: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      expiresin: {
          type: Sequelize.DATE,
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
    
     await queryInterface.dropTable('reset_passwords');
  }
};
