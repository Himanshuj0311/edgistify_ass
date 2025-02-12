const jwt = require('jsonwebtoken');
const User = require('../models/User.Schema');
require("dotenv").config();


// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ status: 401, message: "Authorization token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET,process.env.JWT_EXPIRES_IN); 
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    req.user = user; 
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Authentication failed", error: error.message });
  }
};

module.exports = authenticateUser;
