const mongoose = require("mongoose");
const Skills = require("../models/skills");
const Projects = require("../models/projects");
const About = require("../models/about");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI);

// After you upload images to Cloudinary, replace these with the actual URLs
const cloudinaryUrls = {
  "javascript": "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio-uploads/skills/javascript-icon",
  "html5": "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio-uploads/skills/html5-icon",
  "css3": "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio-uploads/skills/css3-icon",
  "bootstrap": "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio-uploads/skills/bootstrap-icon",
  "nodejs": "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio-uploads/skills/nodejs-icon",
  "express": "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio-uploads/skills/express-icon",
  "mongodb": "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio-uploads/skills/mongodb-icon",
  "bakery-project": "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio-uploads/projects/bakery-project",
  "profile": "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio-uploads/profile/profile-photo"
};

async function updateDatabaseUrls() {
  try {
    console.log("Updating database URLs to use Cloudinary...");

    // Update Skills iconUrls
    await Skills.findOneAndUpdate(
      { name: "JavaScript" },
      { iconUrl: cloudinaryUrls.javascript }
    );
    console.log("✅ Updated JavaScript icon");

    await Skills.findOneAndUpdate(
      { name: "HTML5" },
      { iconUrl: cloudinaryUrls.html5 }
    );
    console.log("✅ Updated HTML5 icon");

    await Skills.findOneAndUpdate(
      { name: "CSS3" },
      { iconUrl: cloudinaryUrls.css3 }
    );
    console.log("✅ Updated CSS3 icon");

    await Skills.findOneAndUpdate(
      { name: "bootsrap V5" },
      { iconUrl: cloudinaryUrls.bootstrap }
    );
    console.log("✅ Updated Bootstrap icon");

    await Skills.findOneAndUpdate(
      { name: "Node js" },
      { iconUrl: cloudinaryUrls.nodejs }
    );
    console.log("✅ Updated Node.js icon");

    await Skills.findOneAndUpdate(
      { name: "express js" },
      { iconUrl: cloudinaryUrls.express }
    );
    console.log("✅ Updated Express.js icon");

    await Skills.findOneAndUpdate(
      { name: "MongoDB" },
      { iconUrl: cloudinaryUrls.mongodb }
    );
    console.log("✅ Updated MongoDB icon");

    // Update Projects imageUrls
    await Projects.findOneAndUpdate(
      { title: "Bakery Website" },
      { imageUrl: cloudinaryUrls["bakery-project"] }
    );
    console.log("✅ Updated Bakery project image");

    // Update About profileImageUrl
    await About.findOneAndUpdate(
      {},
      { profileImageUrl: cloudinaryUrls.profile }
    );
    console.log("✅ Updated profile image");

    console.log("\n🎉 All database URLs updated to use Cloudinary!");
    
  } catch (error) {
    console.error("❌ Error updating database:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the update function
if (require.main === module) {
  updateDatabaseUrls();
}

module.exports = { updateDatabaseUrls };