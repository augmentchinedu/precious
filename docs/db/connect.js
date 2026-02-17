// /dev/db/connect.js
// Task: 2.1 from docs/tasks/gui-and-db-integration.md
// Author: Andrew, Developer
// Description: This module provides the function to connect to the MongoDB database.

const mongoose = require('mongoose');

/**
 * Connects to the MongoDB database using the provided URI.
 * The application's entry point will call this function and use the
 * connection string from environment variables.
 *
 * @param {string} url - The MongoDB connection string.
 * @returns {Promise} A promise that resolves upon successful connection.
 */
const connectDB = (url) => {
  // In Mongoose v6+, options like useNewUrlParser and useUnifiedTopology are default.
  return mongoose.connect(url);
};

module.exports = connectDB;
