const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: [true, 'Task name is required'],
    trim: true,
    maxlength: [200, 'Task name cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [10000, 'Description cannot exceed 10000 characters']
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Due date must be in the future'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
taskSchema.index({ userId: 1, createdAt: -1 });
taskSchema.index({ userId: 1, dueDate: 1 });
taskSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('Task', taskSchema);
