const Team = require("../models/team.model");

// Create
async function createNewTeam(newTeam) {
  try {
    const team = new Team(newTeam);
    const savedTeam = await team.save();
    return savedTeam;
  } catch (error) {
    throw error;
  }
}

// Read
async function getAllTeams() {
  try {
    const allTeams = await Team.find();
    return allTeams;
  } catch (error) {
    throw error;
  }
}

module.exports = { createNewTeam, getAllTeams };
