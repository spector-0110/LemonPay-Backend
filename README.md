# Task Management Backend API

A robust Node.js, Express, and MongoDB backend application for task management with user authentication, built with modern best practices and security features.

## 🚀 Features

### Authentication System
- **User Registration** with email and password validation
- **User Login** with JWT token generation
- **Password Security** using bcrypt with salt rounds
- **JWT Authentication** middleware for protected routes
- **Profile Management** for authenticated users

### Task Management (CRUD Operations)
- **Create Tasks** with validation and user association
- **Read Tasks** with pagination, filtering, and sorting
- **Update Tasks** with ownership verification
- **Delete Tasks** with proper authorization
- **Task Statistics** dashboard with aggregated data
- **Advanced Filtering** by status, and due date

### Security Features
- **Rate Limiting** to prevent abuse
- **Helmet.js** for security headers
- **CORS** configuration for cross-origin requests
- **Input Validation** using express-validator
- **Error Handling** with comprehensive middleware
- **JWT Token Verification** for all protected routes

## 📋 API Endpoints

### Authentication Endpoints
```
POST   /api/auth/register    - Register a new user
POST   /api/auth/login       - Login user
GET    /api/auth/profile     - Get current user profile (Protected)
```

### Task Management Endpoints
```
POST   /api/tasks           - Create a new task (Protected)
GET    /api/tasks           - Get all tasks with pagination (Protected)
GET    /api/tasks/:id       - Get a specific task (Protected)
PUT    /api/tasks/:id       - Update a task (Protected)
DELETE /api/tasks/:id       - Delete a task (Protected)
GET    /api/tasks/stats     - Get task statistics (Protected)
```

### System Endpoints
```
GET    /                    - API docs and welcome
GET    /health             - Health check endpoint
```

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Security**: Helmet.js, CORS, Rate Limiting
- **Logging**: Morgan
- **Environment Management**: dotenv

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── taskController.js    # Task management logic
│   ├── middlewares/
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── errorHandler.js     # Error handling middleware
│   ├── models/
│   │   ├── User.js              # User schema and model
│   │   └── Task.js              # Task schema and model
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   └── taskRoutes.js        # Task management routes
│   ├── utils/
│   │   └── jwt.js               # JWT utility functions
│   └── validators/
│       ├── userValidator.js     # User input validation
│       └── taskValidator.js     # Task input validation
├── .env                         # Environment variables
├── server.js                    # Main application entry point
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn package manager

### 1. Clone and Install Dependencies
```bash
# Navigate to the project directory
cd backend

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/taskmanagement

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=7d

# Security
BCRYPT_SALT_ROUNDS=12
```

### 3. Database Setup
Make sure MongoDB is running on your system:

```bash
# For local MongoDB installation
mongod

# Or use MongoDB Atlas cloud service
# Update MONGODB_URI in .env with your Atlas connection string
```

### 4. Start the Application

#### Development Mode (with auto-restart)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:8000`

## 📊 Data Models

### User Schema
```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed with bcrypt
  createdAt: { type: Date, default: Date.now }
}
```

### Task Schema
```javascript
{
  taskName: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
}
```

## 🔐 Authentication

### Registration
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

### Using Protected Endpoints
Include the JWT token in the Authorization header:
```bash
Authorization: Bearer your_jwt_token_here
```

## 📝 API Usage Examples

### Create a Task
```bash
POST /api/tasks
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "taskName": "Complete project documentation",
  "description": "Write comprehensive README and API documentation",
  "dueDate": "2025-06-25T10:00:00.000Z",
}
```

### Get Tasks with Filtering
```bash
GET /api/tasks?status=pending&page=1&limit=10&sortBy=dueDate&sortOrder=asc
Authorization: Bearer your_jwt_token
```

### Update a Task
```bash
PUT /api/tasks/60f7b3b3b3b3b3b3b3b3b3b3
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "status": "completed"
}
```

## 🛡️ Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with configurable salt rounds
- **JWT Authentication**: Secure token-based authentication with expiration
- **Rate Limiting**: Prevents brute force attacks and API abuse
- **Input Validation**: Comprehensive validation for all user inputs
- **Error Handling**: Secure error responses that don't leak sensitive information
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Security Headers**: Helmet.js adds various HTTP security headers

## 🚦 Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Specific validation error"
    }
  ]
}
```

## 📈 Performance Features

- **Database Indexing**: Optimized MongoDB indexes for efficient queries
- **Aggregation**: Efficient task statistics using MongoDB aggregation pipeline
- **Connection Pooling**: MongoDB connection optimization

## 🧪 Testing

The API can be tested using tools like:
- **Postman**: Import the collection for easy testing

## 📦 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=8000
MONGODB_URI=your_production_mongodb_connection_string
JWT_SECRET=your_very_secure_production_jwt_secret
```

### Deployment Platforms
- **Railway**: For deployment


## 📄 License

This project is licensed under the ISC License.


## 📞 Support

For support, hit me on mail or create an issue in the repository.

---

**Speed-coded by Vatsa for LemonPay**
