import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    bidId: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" },
    status: { type: String, enum: ["active", "completed", "cancelled"], default: "active" },
  },
  { timestamps: true }
);

const Match = mongoose.model("Match", matchSchema);
export default Match;


