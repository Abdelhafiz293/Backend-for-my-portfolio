const cloudinary = require("cloudinary").v2;
const path = require("path");
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Images to upload with their intended use
const imagesToUpload = [
  {
    name: "javascript-icon",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    folder: "portfolio-uploads/skills"
  },
  {
    name: "html5-icon",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    folder: "portfolio-uploads/skills"
  },
  {
    name: "css3-icon",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    folder: "portfolio-uploads/skills"
  },
  {
    name: "bootstrap-icon",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    folder: "portfolio-uploads/skills"
  },
  {
    name: "nodejs-icon",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    folder: "portfolio-uploads/skills"
  },
  {
    name: "express-icon",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    folder: "portfolio-uploads/skills"
  },
  {
    name: "mongodb-icon",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    folder: "portfolio-uploads/skills"
  }
];

async function uploadImagesToCloudinary() {
  console.log("Starting image upload to Cloudinary...");
  
  const uploadResults = {};

  for (const image of imagesToUpload) {
    try {
      console.log(`Uploading ${image.name}...`);
      
      const result = await cloudinary.uploader.upload(image.url, {
        public_id: image.name,
        folder: image.folder,
        resource_type: "image"
      });

      uploadResults[image.name] = result.secure_url;
      console.log(`✅ ${image.name}: ${result.secure_url}`);
      
    } catch (error) {
      console.error(`❌ Failed to upload ${image.name}:`, error.message);
    }
  }

  console.log("\n=== UPLOAD RESULTS ===");
  console.log(JSON.stringify(uploadResults, null, 2));
  
  return uploadResults;
}

// Run the upload
uploadImagesToCloudinary()
  .then((results) => {
    console.log("\n✅ All uploads completed!");
    console.log("Copy these URLs to update your database:");
    Object.entries(results).forEach(([name, url]) => {
      console.log(`${name}: ${url}`);
    });
  })
  .catch((error) => {
    console.error("❌ Upload failed:", error);
  });