const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskById,
  deleteTask,
} = require("../controller/task.controller");
const { verifyJWT } = require("../middlewares/auth");

// Post
router.post("/", verifyJWT, async (req, res) => {
  try {
    const savedTask = await createTask(req.body);
    res
      .status(201)
      .json({ message: "Task Added Successfully.", task: savedTask });
  } catch (error) {
    res.status(500).json({ error: "Failed to add Task." });
  }
});

router.get("/", verifyJWT, async (req, res) => {
  try {
    const allTasks = await getTasks();
    if (allTasks.length != 0) {
      res.json(allTasks);
    } else {
      res.status(404).json({ error: "No Task found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get tasks" });
  }
});

router.put("/:taskId", verifyJWT, async (req, res) => {
  try {
    const updatedTask = await updateTaskById(req.params.taskId, req.body);

    if (updatedTask) {
      res
        .status(200)
        .json({ message: "Task updated successfully", task: updatedTask });
    } else {
      res.status(404).json({ error: "Task not found." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:taskId", verifyJWT, async (req, res) => {
  try {
    const deletedTask = await deleteTask(req.params.taskId);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ error: `Task with id ${req.params.taskId} not found.` });
    }

    return res
      .status(200)
      .json({ message: "Task deleted successfully.", task: deletedTask });
  } catch (error) {}
});

module.exports = router;
