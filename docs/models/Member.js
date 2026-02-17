// /dev/models/Member.js
// Task: 2.2 from docs/tasks/gui-and-db-integration.md
// Author: Clark, Developer
// Description: Mongoose schema and model for Members.

const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Member name must be provided.'],
    trim: true,
    unique: true,
    maxlength: [100, 'Member name cannot exceed 100 characters.']
  },
  role: {
    type: String,
    required: [true, 'Member role must be provided.'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters.']
  },
  type: {
    type: String,
    required: [true, 'Member type must be specified.'],
    enum: ['human', 'agent'],
    default: 'agent'
  }
});

module.exports = mongoose.model('Member', MemberSchema);
