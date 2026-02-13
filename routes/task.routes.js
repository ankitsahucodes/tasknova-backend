const express = require("express");
const router = express.Router();

const {createTask} = require("../controller/task.controller")

// Post
router.post("/", async (req, res) => {
    try {
        const savedTask = await createTask(req.body);
        res.status(201).json({ message: "Task Added Successfully.", task: savedTask})
    } catch (error) {
        res.status(500).json({ error : "Failed to add Task."})
    }
})


module.exports = router