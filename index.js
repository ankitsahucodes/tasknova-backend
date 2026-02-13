const { initializeDatabase } = require("./db/db.connect");
initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors(corsOptions));
app.use(express.json());



// Team routes
const teamRoutes = require("./routes/team.routes");
app.use("/teams", teamRoutes)


// Project Routes
const projectRoutes = require("./routes/project.routes")
app.use("/projects", projectRoutes)


// Task Routes 
const taskRoutes = require("./routes/task.routes")
app.use('/tasks' , taskRoutes)


// Auth
const SECRET_KEY = "secretKey28062002";
const JWT_SECRET = "mYsEcret23";

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  
  try {
    console.log(token);
  } catch (error) {
    return res.status(402).json({ message: "Invalid token." });
  }
};

app.post("/auth/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (password.length < 8) {
    res.status(422).json({ error: "Password should be of atleast 8 characters."})
  }

  if (secret === SECRET_KEY) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token });
  } else {
    res.json({ message: "Invalid Secret" });
  }
});

// app.get("/admin/api/data", verifyJWT, (req, res) => {
//   res.json({ message: "Protected route accessible." });
// });





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
