'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const timestamp = new Date();

    return queryInterface.bulkInsert('products', [
    {
      productName: "Honor Band 9",
      productDescription: "Black Band",
      price: 19.55,
      quantityOnHand: 120,
      categoryId: 302,
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      productName: "Lenovo Ideapad",
      productDescription: "Core i3 500GB",
      price: 5149.12,
      quantityOnHand: 10,
      categoryId: 301,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  ]);
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
