'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('order_products_colors', 'orderOfferProductId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      reference: {
        model: "order_offers_products",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('order_products_colors', 'orderOfferProductId')
  }
};
