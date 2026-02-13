const Project = require("../models/project.model");

// Create
async function createProject(newProject) {
  try {
    const project = new Project(newProject);
    const savedProject = await project.save();
    return savedProject;
  } catch (error) {
    throw error;
  }
}

// Get
async function getAllProjects() {
  try {
    const allProjects = await Project.find();
    return allProjects;
  } catch (error) {
    throw error;
  }
}

module.exports = { createProject, getAllProjects };
