import express from "express";
import { readData, writeData } from "../utils/fileHandler.js";

const router = express.Router();

// GET all tasks
router.get("/", (req, res) => {
  const data = readData();
  res.json(data.tasks);
});

// ADD new task
router.post("/", (req, res) => {
  const data = readData();

  const newTask = {
    id: Date.now(),
    name: req.body.name,
    done: false
  };

  data.tasks.push(newTask);
  writeData(data);

  res.status(201).json(newTask);
});

// TOGGLE done / undone
router.patch("/:id", (req, res) => {
  const data = readData();
  const id = Number(req.params.id);

  const task = data.tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.done = !task.done;
  writeData(data);

  res.json(task);
});

// DELETE task
router.delete("/:id", (req, res) => {
  const data = readData();
  const id = Number(req.params.id);

  data.tasks = data.tasks.filter(t => t.id !== id);
  writeData(data);

  res.json({ success: true });
});

export default router;
