const ApiResponse = require("../utils/apiResponse");

// Validate task creation
exports.validateCreateTask = (req, res, next) => {
  const { title, description } = req.body;
  const errors = [];

  // Validate title
  if (!title) {
    errors.push("Title is required");
  } else if (typeof title !== "string") {
    errors.push("Title must be a string");
  } else if (title.trim().length === 0) {
    errors.push("Title cannot be empty");
  } else if (title.length > 100) {
    errors.push("Title cannot exceed 100 characters");
  }

  // Validate description (optional)
  if (description && typeof description !== "string") {
    errors.push("Description must be a string");
  }

  if (errors.length > 0) {
    return res
      .status(400)
      .json(ApiResponse.error("Validation failed", 400, errors));
  }

  next();
};

// Validate task status update
exports.validateUpdateTask = (req, res, next) => {
  const { status } = req.body;
  const errors = [];

  // Check if status is provided
  if (!status) {
    errors.push("Status is required");
  } else if (typeof status !== "string") {
    errors.push("Status must be a string");
  } else {
    const validStatuses = ["pending", "in-progress", "completed"];
    if (!validStatuses.includes(status)) {
      errors.push(`Status must be one of: ${validStatuses.join(", ")}`);
    }
  }

  if (errors.length > 0) {
    return res
      .status(400)
      .json(ApiResponse.error("Validation failed", 400, errors));
  }

  next();
};
