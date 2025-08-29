import express from "express";
import Teacher from "../models/Teacher.js";

const router = express.Router();

// Create teacher profile
router.post("/", async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List teachers with optional filters: area, class, subject
router.get("/", async (req, res) => {
  try {
    const { area, class: cls, subject } = req.query;
    const filter = {};
    if (area) filter.areas = area;
    if (cls) filter.classes = cls;
    if (subject) filter.subjects = subject;
    const teachers = await Teacher.find(filter).sort({ createdAt: -1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get teacher by id
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ error: "Not found" });
    res.json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;


