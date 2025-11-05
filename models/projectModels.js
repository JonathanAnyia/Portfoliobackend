const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['planned', 'completed'], default: 'planned' },
  slug: { type: String, required: true, unique: true },
  technologies: [{ type: String }],
  githubLink: { type: String },
  liveDemoLink: { type: String },
  createdAt: { type: Date, default: Date.now }
},
 { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
