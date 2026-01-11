import express from "express";
import { readData, writeData } from "../utils/fileHandler.js";

const router = express.Router();

// get weekly timetable
router.get("/", (req, res) => {
  const data = readData();
  res.json(data.weekly);
});

// update a cell
router.patch("/:id", (req, res) => {
  const data = readData();
  const { id } = req.params;

  const cell = data.weekly.find(c => c.id === id);
  if (!cell) {
    return res.status(404).json({ error: "Cell not found" });
  }

  cell.task = req.body.subjectId;
  writeData(data);

  res.json(cell);
});

export default router;
