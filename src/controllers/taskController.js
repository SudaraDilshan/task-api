/**
 * ============================================================
 * PRESENTATION / API LAYER (Controller)
 * ============================================================
 * Responsibility: Handle HTTP requests & responses ONLY.
 *
 * ✅ HIGH COHESION: Everything here is about HTTP.
 * ✅ LOOSE COUPLING: Doesn't know business rules or storage.
 *    Only calls the service layer.
 * ✅ ZERO business logic — just translates HTTP ↔ Service.
 *
 * ❌ NEVER: Write validation rules here (that's the service).
 * ❌ NEVER: Touch the database here (that's the repository).
 * ============================================================
 */

const taskService = require("../services/taskService");

/**
 * Helper to map service errors to proper HTTP response codes.
 * - 404: Resource not found.
 * - 400: Client validation/input error.
 * - 500: Unexpected internal server error.
 */
function handleError(res, error) {
  if (error.message === "Task not found") {
    return res.status(404).json({ error: error.message });
  }
  if (
    error.message === "Invalid task ID" ||
    error.message.includes("required") ||
    error.message.includes("must be") ||
    error.message.includes("provided")
  ) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: error.message || "Internal server error" });
}

/**
 * GET /tasks
 * Returns all tasks as JSON.
 */
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * GET /tasks/:id
 * Returns a single task or 404.
 */
exports.getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * POST /tasks
 * Creates a new task. Returns 201 on success, 400 on validation error.
 */
exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * PUT /tasks/:id
 * Updates an existing task.
 */
exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * DELETE /tasks/:id
 * Deletes a task.
 */
exports.deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};