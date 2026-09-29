/**
 * ============================================================
 * DATA ACCESS LAYER (Repository)
 * ============================================================
 * Responsibility: ONLY talk to storage (database, file, memory).
 *
 * ✅ HIGH COHESION: Everything in this file is about data storage.
 * ✅ LOOSE COUPLING: Knows nothing about HTTP or business rules.
 * ✅ EXTENSIBILITY: To switch from in-memory to PostgreSQL,
 *    you ONLY change this file. Nothing else breaks.
 *
 * ❌ NEVER: Validate business rules here.
 * ❌ NEVER: Handle HTTP requests/responses here.
 * ============================================================
 */

// In-memory storage (simulating a database)
// In production, this would be replaced with MongoDB, PostgreSQL, etc.
let tasks = [];
let idCounter = 1;

/**
 * Find all tasks from storage.
 * @returns {Array} List of all tasks.
 */
exports.findAll = () => {
  return tasks;
};

/**
 * Find a single task by its ID.
 * @param {number} id - The task ID.
 * @returns {Object|null} The task or null if not found.
 */
exports.findById = (id) => {
  return tasks.find((task) => task.id === id) || null;
};

/**
 * Save a new task to storage.
 * @param {Object} data - Task data (title, description, etc.).
 * @returns {Object} The saved task with a generated ID.
 */
exports.save = (data) => {
  const newTask = {
    id: idCounter++,
    title: data.title,
    description: data.description || "",
    status: data.status || "pending",
    priority: data.priority || "medium",
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
};

/**
 * Update an existing task by ID.
 * @param {number} id - The task ID.
 * @param {Object} updates - Fields to update.
 * @returns {Object|null} The updated task or null if not found.
 */
exports.update = (id, updates) => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  Object.assign(task, updates);
  return task;
};

/**
 * Delete a task by ID.
 * @param {number} id - The task ID.
 * @returns {boolean} True if deleted, false if not found.
 */
exports.remove = (id) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};