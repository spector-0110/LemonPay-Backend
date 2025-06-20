const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const {
  validateUserRegistration,
  validateUserLogin,
  handleValidationErrors
} = require('../validators/userValidator');
const authenticate = require('../middlewares/auth');

const router = express.Router();

/**
 * @route   POST /api/auth/register
 */
router.post('/register', validateUserRegistration, handleValidationErrors, register);

/**
 * @route   POST /api/auth/login
 */
router.post('/login', validateUserLogin, handleValidationErrors, login);

/**
 * @route   GET /api/auth/profile
 */
router.get('/profile', authenticate, getProfile);

module.exports = router;
