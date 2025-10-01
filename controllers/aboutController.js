const About = require("../models/about");

// Get about information
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About information not found",
      });
    }

    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create or update about information
exports.createOrUpdateAbout = async (req, res) => {
  try {
    const { description, profileImageUrl } = req.body;

    // Check if about document exists
    let about = await About.findOne();

    if (about) {
      // Update existing about
      about.description = description || about.description;
      about.profileImageUrl = profileImageUrl || about.profileImageUrl;
      about = await about.save();
    } else {
      // Create new about
      about = new About({
        description,
        profileImageUrl,
      });
      about = await about.save();
    }

    res.status(200).json({
      success: true,
      message: about
        ? "About information updated successfully"
        : "About information created successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update about with uploaded image
exports.updateAboutImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    // With Cloudinary, the file URL is directly available
    const imageUrl = req.file.path; // Cloudinary provides the full URL

    // Find and update the about document
    let about = await About.findOne();

    if (!about) {
      // Create new about with image
      about = new About({
        description: "Add your description here",
        profileImageUrl: imageUrl,
      });
    } else {
      // Update existing about with new image
      about.profileImageUrl = imageUrl;
    }

    about = await about.save();

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      data: about,
      imageUrl: imageUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete about information
exports.deleteAbout = async (req, res) => {
  try {
    const about = await About.findOneAndDelete();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About information not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "About information deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
