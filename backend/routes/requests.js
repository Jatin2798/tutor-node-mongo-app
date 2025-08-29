import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

// Create tutoring request (Parent/Student)
router.post("/", async (req, res) => {
  try {
    const request = await Request.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List requests with optional filters
router.get("/", async (req, res) => {
  try {
    const { area, class: cls, subject, status } = req.query;
    const filter = {};
    if (area) filter.areaPin = area;
    if (cls) filter.class = cls;
    if (subject) filter.subjects = subject;
    if (status) filter.status = status;
    const requests = await Request.find(filter).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single request
router.get("/:id", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ error: "Not found" });
    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;


