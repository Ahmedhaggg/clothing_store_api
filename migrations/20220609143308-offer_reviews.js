'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('offer_reviews', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      rating: {
        type: Sequelize.TINYINT,
        allowNull: false
      },
      comment: {
        type: Sequelize.TEXT,
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
      offerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'offers',
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
    
     await queryInterface.dropTable('offer_reviews');
  }
};
