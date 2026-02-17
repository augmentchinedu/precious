/**
 * @model User
 * @description Represents a User entity in the system.
 * This model encapsulates user data and will eventually include business logic
 * related to user operations.
 */
const userSchema = require('../schemas/user.schema.js'); // Assuming relative path for module resolution

class User {
  /**
   * Creates a new User instance.
   * @param {object} userData - The user data, expected to conform to userSchema.
   * @param {string} userData.id - The user's unique ID.
   * @param {string} userData.username - The user's public display name.
   * @param {string} [userData.createdAt] - The creation timestamp. If not provided, it will be generated.
   */
  constructor({ id, username, createdAt }) {
    this.id = id;
    this.username = username;
    this.createdAt = createdAt || new Date().toISOString();

    // In a real implementation, we would validate this object against userSchema
    // using a library like Ajv.
  }

  /**
   * A static method to get the schema associated with this model.
   * @returns {object} The user schema.
   */
  static getSchema() {
    return userSchema;
  }
}

module.exports = User;
