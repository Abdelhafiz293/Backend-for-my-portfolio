const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("About", aboutSchema);
