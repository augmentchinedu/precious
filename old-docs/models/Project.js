// /dev/models/Project.js
// Task: 2.2 from docs/tasks/gui-and-db-integration.md
// Author: Benson, Developer
// Description: Mongoose schema and model for Projects.

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name must be provided.'],
    trim: true,
    maxlength: [100, 'Project name cannot exceed 100 characters.']
  },
  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: [500, 'Project description cannot exceed 500 characters.']
  },
  repoUrl: {
    type: String,
    required: false,
    trim: true
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
