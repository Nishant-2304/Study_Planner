import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";
import todayRoutes from "./routes/today.js";

const app = express();

app.use(cors());
app.use(express.json());

// sanity check
app.get("/", (req, res) => {
  res.json({ msg: "Backend running" });
});

// tasks API
app.use("/api/tasks", taskRoutes);
app.use("/api/today", todayRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
