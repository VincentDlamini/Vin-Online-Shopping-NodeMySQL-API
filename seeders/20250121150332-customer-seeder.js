'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const timestamp = new Date();

    return queryInterface.bulkInsert('customers', [
      {
        firstName: "Bongani",
        lastName: "Dlamini",
        email: "BonganiD@yahoo.com",
        password: "Bongani@123",
        address: "123 John Doe Street",
        city: "Johannesburg",
        province: "Gauteng",
        postalCode: 2001,
        country: "South Africa",
        createdAt: timestamp,
        updatedAt: timestamp
    },
    {
        firstName: "Tebogo",
        lastName: "Zondo",
        email: "TZ@yahoo.com",
        password: "TZ@123",
        address: "123 John Doe Street",
        city: "Liverpool",
        province: "London",
        postalCode: 56358,
        country: "England",
        createdAt: timestamp,
        updatedAt: timestamp
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('customers', null, {});
  }
};
