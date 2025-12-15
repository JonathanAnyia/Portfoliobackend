console.log("✅ projectsController loaded");

const Project = require('../models/projectModels');
console.log("✅ Loaded Project model:", Project && Project.modelName ? Project.modelName : typeof Project);

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
      id,
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
      liveUrl
    } = req.body;

    // Validation - align with schema required fields
    if (!title || !description || !technologies || !status || !slug) {
      return res.status(400).json({ message: 'Missing required fields: title, description, technologies, status, slug are required' });
    }

    const normalizedSlug = String(slug).trim().toLowerCase();

    const exists = await Project.findOne({ slug: normalizedSlug });
    if (exists) return res.status(400).json({ message: 'Slug already in use' });

    const project = new Project({
      id,
      title,
      shortDescription,
      briefDescription,
      description,
      detailedProjectOverview,
      technologies,
      status,
      slug: normalizedSlug,
      featured: featured ?? false,
      images: images ?? [],
      githubUrl: githubUrl ?? '',
      liveUrl: liveUrl ?? ''
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
  // expect route param name to be _id (routes use :_id)
  const project = await Project.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
  // expect route param name to be _id (routes use :_id)
  const project = await Project.findByIdAndDelete(req.params._id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
console.log("✅ exports are:", module.exports);
