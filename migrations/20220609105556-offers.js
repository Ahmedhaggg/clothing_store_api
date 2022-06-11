'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('offers', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      slug: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
      },
      price: {
          type: Sequelize.DECIMAL(5,2),
          allowNull: false
      },
      description: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      image: {
          type: Sequelize.STRING(70),
          allowNull: false
      },
      expiresin: {
          type: Sequelize.DATE,
          allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, { 
        uniqueKeys: {
          unique_tag: {
            customIndex: true,
            fields: ["name"]
          }
        } 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('offers');
  }
};
