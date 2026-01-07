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
    let {
      id,
      title,
      shortDescription,
      briefDescription,
      description,
      detailedProjectOverview,
      technologies,
      status,
      slug,
      overview,
      methods,
      impact,
      imageGalleryTitle,
      imageGallerySubtitle,
      featured,
      images,
      githubUrl,
      liveUrl
    } = req.body;

    // validation
    if (!title || !description || !technologies || !status || !slug) {
      return res.status(400).json({
        message: 'Missing required fields: title, description, technologies, status, slug'
      });
    }
    if (!slug || typeof slug !== "string") {
      return res.status(400).json({ message: "Slug is required" });
    }

    const normalizedSlug = String(slug).trim().toLowerCase();

    const exists = await Project.findOne({ slug: normalizedSlug });
    if (exists) {
      return res.status(400).json({ message: 'Slug already in use' });
    }

    // ✅ GENERATE ID BEFORE CREATING PROJECT
    if (!id) {
      const count = await Project.countDocuments();
      id = String(count + 1);
    }

    if (!Array.isArray(technologies)) {
      return res.status(400).json({
       message: "Technologies must be an array of strings"
     });
    }

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
      overview,
      methods,
      impact,
      imageGalleryTitle,
      imageGallerySubtitle,
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
  // Use custom 'id' field, not MongoDB's _id
  const project = await Project.findOneAndUpdate({ id: req.params.id },
    req.body,
    { new: true }
  );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {

  const project = await Project.findOneAndDelete({ id: req.params.id });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

console.log("✅ exports are:", module.exports);
