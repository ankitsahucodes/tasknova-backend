const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middlewares/auth");

const {
  totalCompleteTask,
  totalAllTasks,
  totalTodoTask,
  totalInProgressTask,
  closedByTeam,
  closedByOwner,
  closedByProject,
} = require("../controller/report.controller");

// completed
router.get("/completedTasks", async (req, res) => {
  try {
    const count = await totalCompleteTask();
    res.status(200).json({ totalCompletedTasks: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cannot fetch completed tasks." });
  }
});

// all
router.get("/allTasks", async (req, res) => {
  try {
    const count = await totalAllTasks();
    res.status(200).json({ totalTasks: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cannot fetch all tasks." });
  }
});

// to-do

router.get("/todoTasks", async (req, res) => {
  try {
    const count = await totalTodoTask();
    res.status(200).json({ totalTodoTasks: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cannot fetch To Do tasks." });
  }
});

// inProgress
router.get("/inProgressTasks", async (req, res) => {
  try {
    const count = await totalInProgressTask();
    res.status(200).json({ totalInProgressTasks: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cannot fetch In Progress tasks." });
  }
});

//
// team
router.get("/closedTasks/team", async (req, res) => {
  try {
    const data = await closedByTeam();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Cannot fetch team report" });
  }
});

module.exports = router;
