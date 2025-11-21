console.log("✅ projectsController loaded");

const Project = require('../models/projectModels');
console.log("✅ Loaded Project model:", Project);

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error'});
  }
};

exports.getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      briefDescription,
      description,
      detailedProjectOverview,
      technologies,
      status,
      slug,
      featured,
      images,
      githubUrl,
      liveUrl,
      createdAt,
      updatedAt
    } = req.body;

    // Validation
    if (!title || !shortDescription || !briefDescription || !description || !detailedProjectOverview || !technologies || !status || !slug) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const exists = await Project.findOne({ slug });
    if (exists) return res.status(400).json({ message: 'Slug already in use' });

    const project = new Project({
      title,
      shortDescription,
      briefDescription,
      description,
      detailedProjectOverview,
      technologies,
      status,
      slug,
      featured: featured ?? false,
      images: images ?? [],
      githubUrl: githubUrl ?? '',
      liveUrl: liveUrl ?? '',
      createdAt: createdAt ?? new Date(),
      updatedAt: updatedAt ?? new Date()
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error('❌ Error creating project:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
console.log("✅ exports are:", module.exports);
