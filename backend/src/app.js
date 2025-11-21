const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/database");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Management API is running",
    version: "1.0.0",
    endpoints: {
      tasks: "/api/tasks",
    },
  });
});

// Routes
app.use("/api/tasks", taskRoutes);

app.get("/api/ping-mongo", async (req, res) => {
  try {
    await connectDB();
    res.json({ connected: true });
  } catch (err) {
    res.json({ connected: false, error: err.message });
  }
});


// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
