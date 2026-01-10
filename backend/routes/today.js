import express from "express";
import { readData, writeData } from "../utils/fileHandler.js";

const router = express.Router();

// get today's timetable
router.get("/", (req, res) => {
  const data = readData();
  res.json(data.today);
});

// update a slot
router.patch("/:id", (req, res) => {
  const data = readData();
  const id = Number(req.params.id);

  const slot = data.today.find(s => s.id === id);
  if (!slot) {
    return res.status(404).json({ error: "Slot not found" });
  }

  slot.task = req.body.task;
  writeData(data);

  res.json(slot);
});

export default router;
