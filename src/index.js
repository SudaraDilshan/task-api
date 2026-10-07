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

const path = require("path");
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static frontend UI from public/
app.use(express.static(path.join(__dirname, "../public")));

// ---- Routes ----
app.use("/tasks", taskRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Task API is running" });
});

// Start the server if run directly (local development)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Task API running on http://localhost:${PORT}`);
  });
}

// Export app for serverless environments (Vercel, tests)
module.exports = app;