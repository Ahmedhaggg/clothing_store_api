'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('subcategories', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
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
    await queryInterface.dropTable('subcategories');
  }
};
