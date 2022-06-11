'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', { 
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
          defaultValue: true,
          allowNull: false
      },
      price: {
          type: Sequelize.DECIMAL(4,2),
          allowNull: false
      },
      description: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      image: {
          type: Sequelize.STRING(200),
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
      subcategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subcategories',
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
    await queryInterface.dropTable('products');
     
  }
};
