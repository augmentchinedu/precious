/**
 * @schema User
 * @description Defines the schema for a user account. This serves as a foundational data structure.
 */
const userSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Unique identifier for the user (e.g., UUID). This will likely be provided by a central authentication service.',
    },
    username: {
      type: 'string',
      description: 'Public display name for the user.',
      minLength: 3,
      maxLength: 20,
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'The ISO 8601 timestamp when the user account was created.',
    },
  },
  required: ['id', 'username', 'createdAt'],
  additionalProperties: false,
};

module.exports = userSchema;
