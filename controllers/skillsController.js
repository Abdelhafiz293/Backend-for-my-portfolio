const Skills = require("../models/skills");

// Get all skills (public route)
exports.getAllSkills = async (req, res) => {
  try {
    const allSkills = await Skills.find();
    res.status(200).json({
      success: true,
      count: allSkills.length,
      skills: allSkills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single skill by ID (public route)
exports.getSkillById = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skills.findById(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new skill (admin only)
exports.createSkill = async (req, res) => {
  try {
    const skillData = req.body;

    // Basic validation
    if (!skillData.name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required",
      });
    }

    const newSkill = await Skills.create(skillData);

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skill: newSkill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update skill (admin only)
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedSkill = await Skills.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill: updatedSkill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete skill (admin only)
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSkill = await Skills.findByIdAndDelete(id);

    if (!deletedSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
