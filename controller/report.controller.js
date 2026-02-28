const Task = require("../models/task.model");

// total completed
async function totalCompleteTask() {
  return await Task.countDocuments({ status: "Completed" });
}

// total tasks in system
async function totalAllTasks() {
  return await Task.countDocuments();
}

// total To-do
async function totalTodoTask() {
  return await Task.countDocuments({ status: "To Do" });
}

// total InProgress
async function totalInProgressTask() {
  return await Task.countDocuments({ status: "In Progress" });
}

// closed by TEAM
async function closedByTeam() {
  const tasks = await Task.find({ status: "Completed" })
    .populate("team")
    .lean();

  const count = {};

  tasks.forEach((task) => {
    const key = task.team?.name || "Unassigned";

    count[key] = (count[key] || 0) + 1;
  });

  return Object.keys(count).map((name) => ({
    name,
    totalClosed: count[name],
  }));
}

module.exports = {
  totalCompleteTask,
  totalAllTasks,
  totalTodoTask,
  totalInProgressTask,
  closedByTeam,
};
