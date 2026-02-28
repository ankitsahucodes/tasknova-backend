const { initializeDatabase } = require("./db/db.connect");
initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const express = require("express");
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// Team routes
const teamRoutes = require("./routes/team.routes");
app.use("/teams", teamRoutes);

// Project Routes
const projectRoutes = require("./routes/project.routes");
app.use("/projects", projectRoutes);

// Task Routes
const taskRoutes = require("./routes/task.routes");
app.use("/tasks", taskRoutes);

// Auth Routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// User Routes
const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

// Report Routes
const reportRoutes = require("./routes/report.routes");
app.use("/report", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
