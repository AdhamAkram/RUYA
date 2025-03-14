const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

// Connect to PostgreSQL using the URL from the .env file
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false, // Disable SQL logging in the console
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch(err => console.error("❌ Database connection failed:", err));

module.exports = sequelize;
