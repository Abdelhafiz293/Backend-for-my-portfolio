const express = require("express");
const projects = require("../models/projects");

exports.uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    // With Cloudinary, the file URL is directly available
    const imageUrl = req.file.path; // Cloudinary provides the full URL in req.file.path

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: imageUrl,
      publicId: req.file.filename, // Cloudinary public ID
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
