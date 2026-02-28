const express = require("express");
const router = express.Router();

const UserDB = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verifyJWT } = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserDB.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserDB({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({
      message: "User registered successfully.",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Failed to register user." });
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: "Email and password are both required." });
  }

  const { email, password } = req.body;

  try {
    const user = await UserDB.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Invalid credentials, Password does not match." });
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "12h",
      },
    );
    res.json({
      message: "Login successful.",
      token,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to login." });
  }
});

router.get("/api/data", verifyJWT, (req, res) => {
  res.json({ message: "Protected route accessible." });
});

module.exports = router;
