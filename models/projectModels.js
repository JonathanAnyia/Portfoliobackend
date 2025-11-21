const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  briefDescription: { type: String, required: true },
  description: { type: String, required: true },
  detailedProjectOverview: { type: String, required: true },
  technologies: { type: [String], required: true },
  status: { type: String, enum: ['completed', 'in-progress', 'planned'], required: true },
  slug: { type: String, required: true, unique: true },
  featured: { type: Boolean, default: false },
  images: { type: [String], default: [] },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);
