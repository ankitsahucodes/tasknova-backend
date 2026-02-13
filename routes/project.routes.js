const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
} = require("../controller/project.controller");

// Post
router.post("/", async (req, res) => {
  try {
    const savedProject = await createProject(req.body);
    res
      .status(201)
      .json({ message: "Project Added Successfully.", project: savedProject });
  } catch (error) {
    res.status(500).json({ error: "Failed to add project." });
  }
});

// Get
router.get("/", async (req, res) => {
  try {
    const allProjects = await getAllProjects();
    if (allProjects.length != 0) {
      res.json(allProjects);
    } else {
      res.status(404).json({ error: "No Project Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get projects." });
  }
});

module.exports = router;
