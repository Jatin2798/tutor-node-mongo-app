import express from "express";
import Bid from "../models/Bid.js";
import Request from "../models/Request.js";
import Match from "../models/Match.js";

const router = express.Router();

// Create bid by a teacher on a request
router.post("/", async (req, res) => {
  try {
    const bid = await Bid.create(req.body);
    console.log("Bid created:", bid);
    res.status(201).json(bid);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List bids for a given request
router.get("/", async (req, res) => {
  try {
    const { requestId, teacherId } = req.query;
    const filter = {};
    if (requestId) filter.requestId = requestId;
    if (teacherId) filter.teacherId = teacherId;
    const bids = await Bid.find(filter).sort({ createdAt: -1 });
    res.json(bids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept a bid -> mark bid accepted, request matched, create match
router.patch("/:id/accept", async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ error: "Bid not found" });
    bid.status = "accepted";
    await bid.save();

    await Bid.updateMany({ requestId: bid.requestId, _id: { $ne: bid._id } }, { $set: { status: "rejected" } });

    const request = await Request.findByIdAndUpdate(
      bid.requestId,
      { $set: { status: "matched" } },
      { new: true }
    );

    const match = await Match.create({ requestId: bid.requestId, teacherId: bid.teacherId, bidId: bid._id });
    res.json({ bid, request, match });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;


