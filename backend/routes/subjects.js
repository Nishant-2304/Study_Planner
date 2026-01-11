    import express from "express";
import { readData, writeData } from "../utils/fileHandler.js";

const router = express.Router();

// GET all subjects
router.get("/", (req, res) => {
  const data = readData();
  res.json(data.subjects);
});

// ADD subject
router.post("/", (req, res) => {
  const data = readData();

  const newSubject = {
    id: Date.now(),
    name: req.body.name,
    color: req.body.color,
    targetHours: req.body.targetHours
  };

  data.subjects.push(newSubject);
  writeData(data);

  res.status(201).json(newSubject);
});

// DELETE subject
router.delete("/:id", (req, res) => {
  const data = readData();
  const id = Number(req.params.id);

  data.subjects = data.subjects.filter(s => s.id !== id);
  writeData(data);

  res.json({ success: true });
});

export default router;
