const Task = require("../models/task.model")

async function createTask(newTask) {
    try {
        const task = new Task(newTask)
        const savedTask = await task.save()
        return savedTask
    } catch (error) {
        throw error
    }
}


module.exports = { createTask }