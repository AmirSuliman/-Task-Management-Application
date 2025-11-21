const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../middleware/validateRequest");
const connectDB = require("../config/database");

// POST /api/tasks - Create new task
router.post("/", async (req, res, next) => {
  await connectDB();
  next();
}, validateCreateTask, taskController.createTask);

// GET /api/tasks - Get all tasks (with optional status filter)
// Connect to MongoDB before processing the request (for vercel deployment)
router.get("/",async (req, res, next) => {
  await connectDB();
  next();
}, taskController.getAllTasks);

// PATCH /api/tasks/:id - Update task status
router.patch("/:id", validateUpdateTask, taskController.updateTaskStatus);

// DELETE /api/tasks/:id - Delete task
router.delete("/:id", taskController.deleteTask);

module.exports = router;
