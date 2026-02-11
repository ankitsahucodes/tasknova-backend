const express = require("express");
const router = express.Router();

const { createNewTeam, getAllTeams } = require("../controller/team.controller");

// Post
router.post("/", async (req, res) => {
  try {
    const savedTeam = await createNewTeam(req.body);
    res
      .status(201)
      .json({ message: "Team added successfully", team: savedTeam });
  } catch (error) {
    res.status(500).json({ error: "Failed to add team." });
  }
});

// get

router.get("/", async (req, res) => {
  try {
    const teams = await getAllTeams();
    if (teams.length != 0) {
      res.json(teams);
    } else {
      res.status(404).json({ error: "No Team found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get teams" });
  }
});

module.exports = router;
