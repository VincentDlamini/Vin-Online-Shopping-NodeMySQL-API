'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const timestamp = new Date();

    return queryInterface.bulkInsert('ordereditems', [
      {
        orderId: 400,
        productId: 200,
        quantity: 2,
        unitPrice: 300.22,
        createdAt: timestamp,
        updatedAt: timestamp
    },
    {
      orderId: 401,
      productId: 200,
      quantity: 4,
      unitPrice: 600.44,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  ]);
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ordereditems', null, {});
  }
};
