'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const timestamp = new Date();

    return queryInterface.bulkInsert('administrators', [
      {
        name: "Smith",
        email: "smith@gmail.com",
        password: "smith123",
        role: "Senior Administartor",
        status: "Active",
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('administrators', null, {});
  }
};
