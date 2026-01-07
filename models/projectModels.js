const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortDescription: { type: String},
  briefDescription: { type: String},
  description: { type: String, required: true },
  detailedProjectOverview: { type: String},
  overview: { type: String },
  methods: { type: String },
  impact: { type: String },
  imageGalleryTitle: { type: String },
  imageGallerySubtitle: { type: String },
  technologies: { type: [String], required: true },
  status: { type: String, enum: ['completed', 'in-progress', 'planned'], required: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  featured: { type: Boolean, default: false },
  images: { type: [String], default: [] },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
