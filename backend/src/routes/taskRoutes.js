const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../middleware/validateRequest");

// POST /api/tasks - Create new task
router.post("/", validateCreateTask, taskController.createTask);

// GET /api/tasks - Get all tasks (with optional status filter)
router.get("/", taskController.getAllTasks);

// PATCH /api/tasks/:id - Update task status
router.patch("/:id", validateUpdateTask, taskController.updateTaskStatus);

// DELETE /api/tasks/:id - Delete task
router.delete("/:id", taskController.deleteTask);

module.exports = router;
