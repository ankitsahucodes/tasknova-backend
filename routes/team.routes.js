const express = require("express");
const router = express.Router();

const {
  createNewTeam,
  getAllTeams,
  deleteTeam,
} = require("../controller/team.controller");
const { verifyJWT } = require("../middlewares/auth");

const Team = require("../models/team.model");

// Post
router.post("/", verifyJWT, async (req, res) => {
  try {
    const savedTeam = await createNewTeam(req.body);
    res
      .status(201)
      .json({ message: "Team Added Successfully.", team: savedTeam });
  } catch (error) {
    res.status(500).json({ error: "Failed to add team." });
  }
});

// get

router.get("/", verifyJWT, async (req, res) => {
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

router.put("/:teamId", verifyJWT, async (req, res) => {
  try {
    const { teamId } = req.params;
    const { memberId } = req.body;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // prevent duplicate
    if (!team.members.includes(memberId)) {
      team.members.push(memberId);
    }

    await team.save();

    res.json(team);
  } catch (err) {
    res.status(500).json({ error: "Failed to add member" });
  }
});

//delete

router.delete("/:teamId", async (req, res) => {
  try {
    const deletedTeam = await deleteTeam(req.params.teamId);

    if (!deletedTeam) {
      return res
        .status(404)
        .json({ error: `Team with id ${req.params.teamId} not found.` });
    }

    return res
      .status(200)
      .json({ message: "Team deleted successfully.", team: deletedTeam });
  } catch (error) {}
});

module.exports = router;
