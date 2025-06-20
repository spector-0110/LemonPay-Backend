const jwt = require('jsonwebtoken');

/**
 * Generate JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Generate token for user
 */
const generateUserToken = (user) => {
  return generateToken({
    id: user._id,
    email: user.email
  });
};

module.exports = {
  generateToken,
  verifyToken,
  generateUserToken
};
