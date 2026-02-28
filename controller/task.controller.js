const Task = require("../models/task.model");

async function createTask(newTask) {
  try {
    const task = new Task(newTask);
    const savedTask = await task.save();
    return savedTask;
  } catch (error) {
    throw error;
  }
}

async function getTasks() {
  try {
    const allTasks = await Task.find()
      .populate("project")
      .populate("team")
      .populate("owners");
    return allTasks;
  } catch (error) {
    throw error;
  }
}

async function updateTaskById(taskId, dataToUpdate) {
  try {
    const task = await Task.findByIdAndUpdate(taskId, dataToUpdate, {
      new: true,
      runValidators: true,
    });
    return task;
  } catch (error) {
    throw error;
  }
}

async function deleteTask(taskId) {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    return deletedTask;
  } catch (error) {
    throw error;
  }
}

module.exports = { createTask, getTasks, updateTaskById, deleteTask };
