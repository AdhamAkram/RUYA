const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define the User model
const User = sequelize.define("User", {
  userId: {
    type: DataTypes.UUID, // Use UUID for unique user IDs
    defaultValue: DataTypes.UUIDV4, // Automatically generate UUIDs
    primaryKey: true, // userId is the primary key
  },
  name: {
    type: DataTypes.STRING, // User's name
    allowNull: false, // Name is required
  },
  role: {
    type: DataTypes.ENUM("blind_user", "caregiver"), // User role (blind_user or caregiver)
    allowNull: false, // Role is required
  },
  createdAt: {
    type: DataTypes.DATE, // Timestamp for when the user was created
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE, // Timestamp for when the user was last updated
    allowNull: false,
  },
});

// Export the User model
module.exports = User;