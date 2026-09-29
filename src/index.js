/**
 * ============================================================
 * APPLICATION ENTRY POINT
 * ============================================================
 * Responsibility: Bootstrap the server, wire routes to controllers.
 *
 * This is the ONLY file that knows about Express routing.
 * It connects HTTP routes → Controller functions.
 * ============================================================
 */

const express = require("express");
const taskController = require("./controllers/taskController");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// ---- Routes (HTTP → Controller mapping) ----
app.get("/tasks", taskController.getAllTasks);
app.get("/tasks/:id", taskController.getTaskById);
app.post("/tasks", taskController.createTask);
app.put("/tasks/:id", taskController.updateTask);
app.delete("/tasks/:id", taskController.deleteTask);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Task API is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Task API running on http://localhost:${PORT}`);
});