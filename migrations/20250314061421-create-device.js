"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Devices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceId: {
        type: Sequelize.STRING
      },
      pairedWith: {
        type: Sequelize.UUID,
        allowNull: true,
        // Uncomment and adjust the following lines if you want to enforce a foreign key constraint:
        // references: { model: "Users", key: "userId" },
        // onUpdate: "CASCADE",
        // onDelete: "SET NULL"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Devices");
  }
};
