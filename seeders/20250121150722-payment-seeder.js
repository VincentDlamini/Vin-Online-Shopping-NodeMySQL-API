'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const timestamp = new Date();

    return queryInterface.bulkInsert('payments', [
      {
        orderId: 400,
        paymentMethod: "Credit Card",
        paymentDate: new Date(),
        amount: 415.24,
        createdAt: timestamp,
        updatedAt: timestamp
    },
    {
      orderId: 401,
      paymentMethod: "Credit Card",
      paymentDate: new Date(),
      amount: 415.24,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  ]);
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('payments', null, {});
  }
};
