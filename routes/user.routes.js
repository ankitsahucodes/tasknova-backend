const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middlewares/auth");
const {getAllUsers} = require("../controller/user.controller")

router.get("/", verifyJWT, async (req, res) => {
  try {
    const allUsers = await getAllUsers();
       if (allUsers.length != 0) {
         res.json(allUsers);
       } else {
         res.status(404).json({ error: "No User found." });
       }
     } catch (error) {
       res.status(500).json({ error: "Failed to get users" });
     }
});


module.exports = router