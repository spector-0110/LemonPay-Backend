const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const {
  validateTaskCreation,
  validateTaskUpdate,
  validateTaskId,
  handleValidationErrors
} = require('../validators/taskValidator');
const authenticate = require('../middlewares/auth');

const router = express.Router();

// Apply authentication middleware to all task routes
router.use(authenticate);

/**
 * GET /api/tasks/stats
 */
router.get('/stats', getTaskStats);

/**
 * POST /api/tasks
 */
router.post('/', validateTaskCreation, handleValidationErrors, createTask);

/**
 * @route   GET /api/tasks
 */
router.get('/', getTasks);

/**
 * @route   GET /api/tasks/:id
 */
router.get('/:id', validateTaskId, handleValidationErrors, getTaskById);

/**
 * @route   PUT /api/tasks/:id
 */
router.put('/:id', validateTaskId, validateTaskUpdate, handleValidationErrors, updateTask);

/**
 * @route   DELETE /api/tasks/:id
 */
router.delete('/:id', validateTaskId, handleValidationErrors, deleteTask);

module.exports = router;
