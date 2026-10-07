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
 * @returns {Promise<Array>} List of all tasks.
 */
exports.findAll = async () => {
  return tasks.map((task) => ({ ...task }));
};

/**
 * Find a single task by its ID.
 * @param {number} id - The task ID.
 * @returns {Promise<Object|null>} The task or null if not found.
 */
exports.findById = async (id) => {
  const task = tasks.find((t) => t.id === id);
  return task ? { ...task } : null;
};

/**
 * Save a new task to storage.
 * @param {Object} data - Task data (title, description, etc.).
 * @returns {Promise<Object>} The saved task with a generated ID.
 */
exports.save = async (data) => {
  const newTask = {
    id: idCounter++,
    title: data.title,
    description: data.description || "",
    status: data.status || "pending",
    priority: data.priority || "medium",
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return { ...newTask };
};

/**
 * Update an existing task by ID.
 * @param {number} id - The task ID.
 * @param {Object} updates - Fields to update.
 * @returns {Promise<Object|null>} The updated task or null if not found.
 */
exports.update = async (id, updates) => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  Object.assign(task, updates, { updatedAt: new Date().toISOString() });
  return { ...task };
};

/**
 * Delete a task by ID.
 * @param {number} id - The task ID.
 * @returns {Promise<boolean>} True if deleted, false if not found.
 */
exports.remove = async (id) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};