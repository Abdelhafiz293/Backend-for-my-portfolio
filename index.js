require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

// MongoDB connection with better options for Vercel
const mongoOptions = {
  bufferCommands: false,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

mongoose
  .connect(process.env.DB_URI, mongoOptions)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.error("DB_URI:", process.env.DB_URI ? "✅ Set" : "❌ Missing");
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
