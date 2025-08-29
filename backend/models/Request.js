import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    parentName: { type: String, required: true },
    contactEmail: { type: String },
    contactPhone: { type: String },
    studentName: { type: String, required: true },
    class: { type: String, required: true },
    subjects: { type: [String], default: [] },
    schoolName: { type: String },
    address: { type: String },
    areaPin: { type: String },
    status: { type: String, enum: ["open", "matched", "closed"], default: "open" },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;


