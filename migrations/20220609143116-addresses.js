'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      firstZone: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      secondZone: {
          type: Sequelize.STRING(100),
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
    
     await queryInterface.dropTable('addresses');
  }
};
