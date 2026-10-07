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
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// ---- Routes ----
app.use("/tasks", taskRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Task API is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Task API running on http://localhost:${PORT}`);
});