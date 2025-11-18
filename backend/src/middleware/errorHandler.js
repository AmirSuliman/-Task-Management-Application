const ApiResponse = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error("Error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res
      .status(400)
      .json(ApiResponse.error("Validation failed", 400, errors));
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res
      .status(400)
      .json(ApiResponse.error(`Duplicate value for field: ${field}`, 400));
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json(ApiResponse.error("Invalid ID format", 400));
  }

  // JSON parse error
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json(ApiResponse.error("Invalid JSON format", 400));
  }

  // Default server error
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json(ApiResponse.error(message, statusCode));
};

module.exports = errorHandler;
