const projects = require("../models/projects");

exports.getAllProjects = async (req, res) => {
  try {
    const allProjects = await projects.find();
    res.status(200).json({ success: true, allProjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, imageUrl, link, technologies } = req.body;

    // Validation
    if (!title || !imageUrl || !link || !technologies) {
      return res.status(400).json({
        success: false,
        message: "Title, imageUrl, link, and technologies are required",
      });
    }

    const newProject = await projects.create({
      title,
      description,
      imageUrl,
      link,
      technologies,
    });

    res.status(201).json({ success: true, newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await projects.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, link, technologies } = req.body;

    const updatedProject = await projects.findByIdAndUpdate(
      id,
      { title, description, imageUrl, link, technologies },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({ success: true, updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projects.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
