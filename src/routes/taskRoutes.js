/**
 * ============================================================
 * ROUTING LAYER (Presentation / Transport)
 * ============================================================
 * Responsibility: Map HTTP endpoints and HTTP verbs to
 * controller actions.
 *
 * Keeps index.js focused solely on server configuration and
 * bootstrapping (Single Responsibility Principle).
 * ============================================================
 */

const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
