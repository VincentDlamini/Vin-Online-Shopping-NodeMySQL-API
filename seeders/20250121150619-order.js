'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const timestamp = new Date();

    return queryInterface.bulkInsert('orders', [
      {
        customerId: 100,
        orderDate: new Date(),
        totalCost: 5616,
        createdAt: timestamp,
        updatedAt: timestamp
    },
    {
      customerId: 101,
      orderDate: new Date(),
      totalCost: 2135,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  ]);
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('orders', null, {});
  }
};
