const Task = require("../models/Task");
const ApiResponse = require("../utils/apiResponse");

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description: description || "",
    });

    res
      .status(201)
      .json(ApiResponse.success(task, "Task created successfully", 201));
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks with optional status filter
// @route   GET /api/tasks?status=pending
// @access  Public
exports.getAllTasks = async (req, res, next) => {
  try {
    const { status, sort, search } = req.query;

    // Build query
    const query = {};
    if (status) {
      // Validate status
      const validStatuses = ["pending", "in-progress", "completed"];
      if (!validStatuses.includes(status)) {
        return res
          .status(400)
          .json(
            ApiResponse.error(
              "Invalid status. Must be one of: pending, in-progress, completed",
              400
            )
          );
      }
      query.status = status;
    }

    // Sort by createdAt or status
    let findQuery = Task.find(query);

    if (sort === "createdAt") {
      findQuery = findQuery.sort({ createdAt: -1 });
    } else if (sort === "status") {
      findQuery = findQuery.sort({ status: 1 });
    }

    // Search by title
    if (search) {
      findQuery = findQuery.find({ title: { $regex: search, $options: "i" } });
    }

    const tasks = await findQuery;

    res
      .status(200)
      .json(
        ApiResponse.success(
          tasks,
          `${tasks.length} task(s) retrieved successfully`,
          200
        )
      );
  } catch (error) {
    next(error);
  }
};

// @desc    Update task status
// @route   PATCH /api/tasks/:id
// @access  Public
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!status) {
      return res.status(400).json(ApiResponse.error("Status is required", 400));
    }

    const validStatuses = ["pending", "in-progress", "completed"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json(
          ApiResponse.error(
            "Invalid status. Must be one of: pending, in-progress, completed",
            400
          )
        );
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res
        .status(404)
        .json(ApiResponse.error(`Task not found with id: ${id}`, 404));
    }

    res
      .status(200)
      .json(ApiResponse.success(task, "Task status updated successfully", 200));
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.name === "CastError") {
      return res
        .status(400)
        .json(ApiResponse.error("Invalid task ID format", 400));
    }
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res
        .status(404)
        .json(ApiResponse.error(`Task not found with id: ${id}`, 404));
    }

    res
      .status(200)
      .json(
        ApiResponse.success({ id: task._id }, "Task deleted successfully", 200)
      );
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.name === "CastError") {
      return res
        .status(400)
        .json(ApiResponse.error("Invalid task ID format", 400));
    }
    next(error);
  }
};
