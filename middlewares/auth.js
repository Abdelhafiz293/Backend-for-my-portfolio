//Protection Middleware
//Check for token. if valid, add user data to req object
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "User not found, authorization denied",
      });
    }
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};

module.exports = auth;
