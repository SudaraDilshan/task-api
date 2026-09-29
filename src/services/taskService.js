/**
 * ============================================================
 * BUSINESS LOGIC LAYER (Service)
 * ============================================================
 * Responsibility: Core rules, validation, workflows.
 *
 * ✅ HIGH COHESION: All task-related rules live here.
 * ✅ LOOSE COUPLING: Doesn't know about HTTP (req/res).
 *    Only calls the repository.
 * ✅ MAINTAINABILITY: A new engineer reads this file and
 *    instantly knows the business rules.
 *
 * ❌ NEVER: Handle HTTP status codes or req/res objects.
 * ❌ NEVER: Write SQL queries here.
 * ============================================================
 */

const taskRepository = require("../repositories/taskRepository");

/**
 * Get all tasks.
 * Business rule: Return everything (no filtering yet).
 */
exports.getAllTasks = () => {
  return taskRepository.findAll();
};

/**
 * Get a single task by ID.
 * Business rule: Throw an error if not found.
 */
exports.getTaskById = (id) => {
  const task = taskRepository.findById(Number(id));
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

/**
 * Create a new task.
 * Business rules:
 *  - Title is required.
 *  - Title must be at least 3 characters.
 *  - Priority must be one of: low, medium, high.
 */
exports.createTask = (data) => {
  // --- Validation (Business Rule) ---
  if (!data.title || data.title.trim().length < 3) {
    throw new Error("Title is required and must be at least 3 characters");
  }

  const allowedPriorities = ["low", "medium", "high"];
  if (data.priority && !allowedPriorities.includes(data.priority)) {
    throw new Error("Priority must be low, medium, or high");
  }

  // --- Delegate persistence to repository ---
  return taskRepository.save(data);
};

/**
 * Update an existing task.
 * Business rule: Cannot change the ID. Validate title if provided.
 */
exports.updateTask = (id, updates) => {
  if (updates.title && updates.title.trim().length < 3) {
    throw new Error("Title must be at least 3 characters");
  }

  // Prevent ID tampering
  delete updates.id;

  const updated = taskRepository.update(Number(id), updates);
  if (!updated) {
    throw new Error("Task not found");
  }
  return updated;
};

/**
 * Delete a task.
 * Business rule: Must exist before deletion.
 */
exports.deleteTask = (id) => {
  const deleted = taskRepository.remove(Number(id));
  if (!deleted) {
    throw new Error("Task not found");
  }
  return { message: "Task deleted successfully" };
};