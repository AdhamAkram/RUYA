"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        userId: "550e8400-e29b-41d4-a716-446655440000",
        name: "John Doe",
        role: "blind_user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "550e8400-e29b-41d4-a716-446655440001",
        name: "Jane Smith",
        role: "caregiver",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};