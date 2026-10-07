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

const ALLOWED_PRIORITIES = ["low", "medium", "high"];
const ALLOWED_STATUSES = ["pending", "in-progress", "completed"];

/**
 * Helper to validate and parse numeric IDs.
 * @param {string|number} id
 * @returns {number}
 */
function parseId(id) {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId) || numericId <= 0) {
    throw new Error("Invalid task ID");
  }
  return numericId;
}

/**
 * Get all tasks.
 * Business rule: Return everything (no filtering yet).
 */
exports.getAllTasks = async () => {
  return await taskRepository.findAll();
};

/**
 * Get a single task by ID.
 * Business rule: Throw an error if not found.
 */
exports.getTaskById = async (id) => {
  const numericId = parseId(id);
  const task = await taskRepository.findById(numericId);
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

/**
 * Create a new task.
 * Business rules:
 *  - Title is required and must be at least 3 characters.
 *  - Priority must be one of: low, medium, high (default: medium).
 *  - Status (if provided) must be one of: pending, in-progress, completed.
 */
exports.createTask = async (data) => {
  if (!data || !data.title || data.title.trim().length < 3) {
    throw new Error("Title is required and must be at least 3 characters");
  }

  if (data.priority && !ALLOWED_PRIORITIES.includes(data.priority)) {
    throw new Error("Priority must be low, medium, or high");
  }

  if (data.status && !ALLOWED_STATUSES.includes(data.status)) {
    throw new Error("Status must be pending, in-progress, or completed");
  }

  return await taskRepository.save({
    title: data.title.trim(),
    description: data.description ? data.description.trim() : "",
    status: data.status,
    priority: data.priority,
  });
};

/**
 * Update an existing task.
 * Business rules:
 *  - Cannot change task ID.
 *  - Title must be at least 3 characters if provided.
 *  - Priority must be valid if provided.
 *  - Status must be valid if provided.
 */
exports.updateTask = async (id, updates) => {
  const numericId = parseId(id);

  if (!updates || typeof updates !== "object") {
    throw new Error("Update data must be provided");
  }

  if (updates.title !== undefined && updates.title.trim().length < 3) {
    throw new Error("Title must be at least 3 characters");
  }

  if (updates.priority && !ALLOWED_PRIORITIES.includes(updates.priority)) {
    throw new Error("Priority must be low, medium, or high");
  }

  if (updates.status && !ALLOWED_STATUSES.includes(updates.status)) {
    throw new Error("Status must be pending, in-progress, or completed");
  }

  // Prevent mutating caller object and strip ID tampering
  const safeUpdates = { ...updates };
  delete safeUpdates.id;

  if (safeUpdates.title) {
    safeUpdates.title = safeUpdates.title.trim();
  }

  const updated = await taskRepository.update(numericId, safeUpdates);
  if (!updated) {
    throw new Error("Task not found");
  }
  return updated;
};

/**
 * Delete a task.
 * Business rule: Must exist before deletion.
 */
exports.deleteTask = async (id) => {
  const numericId = parseId(id);
  const deleted = await taskRepository.remove(numericId);
  if (!deleted) {
    throw new Error("Task not found");
  }
  return { message: "Task deleted successfully" };
};