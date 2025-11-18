# Task Management Backend API 🚀

A professional, scalable RESTful API built with Node.js, Express, and MongoDB for managing tasks.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Architecture Decisions](#architecture-decisions)

## ✨ Features

- ✅ RESTful API endpoints for task management
- ✅ MongoDB integration with Mongoose ODM
- ✅ Input validation with detailed error messages
- ✅ Centralized error handling
- ✅ CORS enabled for cross-origin requests
- ✅ Environment-based configuration
- ✅ Professional MVC architecture
- ✅ Scalable and maintainable code structure
- ✅ Proper HTTP status codes and responses

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Environment Management**: dotenv
- **CORS**: cors

## 📁 Project Structure

```
task-management-backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection configuration
│   ├── models/
│   │   └── Task.js              # Task schema and model
│   ├── controllers/
│   │   └── taskController.js    # Business logic for tasks
│   ├── routes/
│   │   └── taskRoutes.js        # API route definitions
│   ├── middleware/
│   │   ├── errorHandler.js      # Global error handling
│   │   └── validateRequest.js   # Input validation middleware
│   ├── utils/
│   │   └── apiResponse.js       # Standardized API responses
│   └── app.js                   # Express app configuration
├── .env                         # Environment variables (not in repo)
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies and scripts
├── server.js                    # Server entry point
└── README.md                    # Documentation
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone or create the project directory**

   ```bash
   mkdir task-management-backend
   cd task-management-backend
   ```

2. **Initialize and install dependencies**

   ```bash
   npm init -y
   npm install express mongoose dotenv cors
   npm install --save-dev nodemon
   ```

3. **Create the project structure**
   Create all the folders and files as shown in the [Project Structure](#project-structure) section.

4. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanagement
   NODE_ENV=development
   ```

   **For MongoDB Atlas (Cloud):**

   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanagement
   NODE_ENV=development
   ```

5. **Update package.json scripts**
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

### Running the Application

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api/tasks
```

### Endpoints

#### 1. Create Task

Creates a new task with the provided title and optional description.

- **URL**: `/api/tasks`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "data": {
      "id": "674b1c2d3e4f5a6b7c8d9e0f",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "status": "pending",
      "createdAt": "2025-11-18T10:30:00.000Z",
      "updatedAt": "2025-11-18T10:30:00.000Z"
    },
    "statusCode": 201
  }
  ```
- **Error Response** (400):
  ```json
  {
    "success": false,
    "message": "Validation failed",
    "errors": ["Title is required", "Title cannot exceed 100 characters"],
    "statusCode": 400
  }
  ```

#### 2. Get All Tasks

Retrieves all tasks, optionally filtered by status.

- **URL**: `/api/tasks` or `/api/tasks?status=pending`
- **Method**: `GET`
- **Query Parameters**:
  - `status` (optional): Filter by status (`pending`, `in-progress`, `completed`)
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "3 task(s) retrieved successfully",
    "data": [
      {
        "id": "674b1c2d3e4f5a6b7c8d9e0f",
        "title": "Complete project documentation",
        "description": "Write comprehensive README and API docs",
        "status": "pending",
        "createdAt": "2025-11-18T10:30:00.000Z",
        "updatedAt": "2025-11-18T10:30:00.000Z"
      }
    ],
    "statusCode": 200
  }
  ```
- **Error Response** (400 - Invalid status):
  ```json
  {
    "success": false,
    "message": "Invalid status. Must be one of: pending, in-progress, completed",
    "statusCode": 400
  }
  ```

#### 3. Update Task Status

Updates the status of an existing task.

- **URL**: `/api/tasks/:id`
- **Method**: `PATCH`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "status": "in-progress"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "Task status updated successfully",
    "data": {
      "id": "674b1c2d3e4f5a6b7c8d9e0f",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "status": "in-progress",
      "createdAt": "2025-11-18T10:30:00.000Z",
      "updatedAt": "2025-11-18T10:35:00.000Z"
    },
    "statusCode": 200
  }
  ```
- **Error Response** (404):
  ```json
  {
    "success": false,
    "message": "Task not found with id: 674b1c2d3e4f5a6b7c8d9e0f",
    "statusCode": 404
  }
  ```
- **Error Response** (400 - Invalid ID):
  ```json
  {
    "success": false,
    "message": "Invalid task ID format",
    "statusCode": 400
  }
  ```

#### 4. Delete Task

Deletes a task by its ID.

- **URL**: `/api/tasks/:id`
- **Method**: `DELETE`
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "Task deleted successfully",
    "data": {
      "id": "674b1c2d3e4f5a6b7c8d9e0f"
    },
    "statusCode": 200
  }
  ```
- **Error Response** (404):
  ```json
  {
    "success": false,
    "message": "Task not found with id: 674b1c2d3e4f5a6b7c8d9e0f",
    "statusCode": 404
  }
  ```

### Testing with cURL

```bash
# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Implement authentication","description":"Add JWT authentication"}'

# Get all tasks
curl http://localhost:5000/api/tasks

# Get tasks by status
curl http://localhost:5000/api/tasks?status=pending

# Update task status
curl -X PATCH http://localhost:5000/api/tasks/674b1c2d3e4f5a6b7c8d9e0f \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'

# Delete a task
curl -X DELETE http://localhost:5000/api/tasks/674b1c2d3e4f5a6b7c8d9e0f
```

### Testing with Postman

1. Import the following collection or create requests manually
2. Set base URL as environment variable: `http://localhost:5000`
3. Test each endpoint with the examples provided above

## ⚠️ Error Handling

The API implements comprehensive error handling:

### Validation Errors (400)

- Missing required fields
- Invalid data types
- Field length violations
- Invalid status values

### Not Found Errors (404)

- Task with specified ID doesn't exist
- Invalid route

### Server Errors (500)

- Database connection issues
- Unexpected server errors

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"],
  "statusCode": 400
}
```

## 🏗 Architecture Decisions

### 1. MVC Pattern

- **Models**: Define data structure and validation (Mongoose schemas)
- **Controllers**: Handle business logic and request processing
- **Routes**: Define API endpoints and map to controllers

### 2. Middleware Pattern

- **Validation Middleware**: Validates requests before reaching controllers
- **Error Handler**: Centralized error handling for consistent responses
- **CORS**: Enables cross-origin requests for frontend integration

### 3. Environment Configuration

- Sensitive data (DB credentials, ports) stored in `.env`
- Different configurations for development/production
- `.env.example` provided for easy setup

### 4. Mongoose ODM

- Schema validation at database level
- Automatic timestamps (createdAt, updatedAt)
- Custom JSON transformation for cleaner API responses

### 5. RESTful Design

- Proper HTTP methods (GET, POST, PATCH, DELETE)
- Meaningful status codes (200, 201, 400, 404, 500)
- Resource-based URLs (/api/tasks/:id)

### 6. Scalability Considerations

- Modular structure allows easy feature additions
- Separated concerns for maintainability
- Middleware can be extended for authentication, logging, etc.
- Database queries optimized with sorting and filtering

## 🔐 Security Considerations

Current implementation includes:

- ✅ Input validation
- ✅ CORS configuration
- ✅ Error message sanitization

For production, consider adding:

- Authentication (JWT)
- Rate limiting
- Request sanitization
- HTTPS enforcement
- Helmet.js for security headers

## 🔄 Connecting Frontend

Update your frontend API calls to point to:

```javascript
const API_BASE_URL = "http://localhost:5000/api/tasks";

// Example: Creating a task
const response = await fetch(API_BASE_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "New Task",
    description: "Task description",
  }),
});

const data = await response.json();
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running locally or connection string is correct
- Check if firewall is blocking MongoDB port (27017)
- Verify MongoDB Atlas IP whitelist settings

### Port Already in Use

- Change PORT in `.env` file
- Kill process using port 5000: `lsof -ti:5000 | xargs kill`

### CORS Issues

- Ensure CORS is enabled in `app.js`
- Check if frontend URL is different from backend

## 📝 Future Enhancements

Potential improvements:

- [ ] Authentication and authorization
- [ ] Task assignment to users
- [ ] Due dates and reminders
- [ ] Task categories/tags
- [ ] File attachments
- [ ] Activity logs
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 👤 Author

Your Name - Full Stack Developer Assignment

## 📄 License

ISC

---

**Note**: This is a backend API for the Task Management Application assignment. The frontend should be run separately and configured to communicate with this API.
