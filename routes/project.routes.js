const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middlewares/auth");

const {
  createProject,
  getAllProjects,
  deleteProject,
} = require("../controller/project.controller");

// Post
router.post("/", verifyJWT, async (req, res) => {
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
router.get("/", verifyJWT, async (req, res) => {
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

// delete

router.delete("/:projectId", verifyJWT, async (req, res) => {
  try {
    const deletedProject = await deleteProject(req.params.projectId);

    if (!deletedProject) {
      return res
        .status(404)
        .json({ error: `Project with id ${req.params.projectId} not found.` });
    }

    return res
      .status(200)
      .json({ message: "Project deleted successfully.", project: deletedProject });
  } catch (error) {}
});


module.exports = router;
