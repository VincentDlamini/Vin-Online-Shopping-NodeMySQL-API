'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const timestamp = new Date();

    return queryInterface.bulkInsert('categories', [
      { 
        categoryName: "Games",
        createdAt: timestamp,
        updatedAt: timestamp
      },
      { 
        categoryName: "Laptops", 
        createdAt: timestamp,
        updatedAt: timestamp
      },
      { 
        categoryName: "Watches",
        createdAt: timestamp,
        updatedAt: timestamp
       },
      { 
        categoryName: "Internet Routers",
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
