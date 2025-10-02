const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadProfileImages() {
  console.log("Uploading your profile and project images to Cloudinary...");

  try {
    // Upload profile photo
    const profilePath = path.join(
      __dirname,
      "public",
      "1759250492220-745640026.png"
    );
    console.log("Uploading profile photo from:", profilePath);

    const profileResult = await cloudinary.uploader.upload(profilePath, {
      public_id: "profile-photo",
      folder: "portfolio-uploads/profile",
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
      ],
    });

    console.log("✅ Profile Photo uploaded:");
    console.log("URL:", profileResult.secure_url);

    // Upload bakery project image
    const projectPath = path.join(
      __dirname,
      "public",
      "1759231244008-220662758.png"
    );
    console.log("\nUploading bakery project image from:", projectPath);

    const projectResult = await cloudinary.uploader.upload(projectPath, {
      public_id: "bakery-website",
      folder: "portfolio-uploads/projects",
      transformation: [{ width: 600, height: 400, crop: "fill" }],
    });

    console.log("✅ Bakery Project Image uploaded:");
    console.log("URL:", projectResult.secure_url);

    console.log("\n📋 COPY THESE URLS TO YOUR DATABASE:");
    console.log("=============================================");
    console.log("Profile Photo URL:");
    console.log(profileResult.secure_url);
    console.log("\nBakery Project URL:");
    console.log(projectResult.secure_url);
    console.log("=============================================");
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
}

uploadProfileImages();
