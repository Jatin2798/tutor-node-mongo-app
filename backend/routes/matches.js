import express from "express";
import Match from "../models/Match.js";

const router = express.Router();

// List matches for a teacher or by request
router.get("/", async (req, res) => {
  try {
    const { requestId, teacherId } = req.query;
    const filter = {};
    if (requestId) filter.requestId = requestId;
    if (teacherId) filter.teacherId = teacherId;
    const matches = await Match.find(filter).sort({ createdAt: -1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


