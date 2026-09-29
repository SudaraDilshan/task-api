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
 * GET /tasks
 * Returns all tasks as JSON.
 */
exports.getAllTasks = (req, res) => {
  try {
    const tasks = taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /tasks/:id
 * Returns a single task or 404.
 */
exports.getTaskById = (req, res) => {
  try {
    const task = taskService.getTaskById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/**
 * POST /tasks
 * Creates a new task. Returns 201 on success, 400 on validation error.
 */
exports.createTask = (req, res) => {
  try {
    const task = taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * PUT /tasks/:id
 * Updates an existing task.
 */
exports.updateTask = (req, res) => {
  try {
    const task = taskService.updateTask(req.params.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/**
 * DELETE /tasks/:id
 * Deletes a task.
 */
exports.deleteTask = (req, res) => {
  try {
    const result = taskService.deleteTask(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};