import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    subjects: { type: [String], default: [] },
    classes: { type: [String], default: [] },
    areas: { type: [String], default: [] },
    experienceYears: { type: Number, default: 0 },
    hourlyRate: { type: Number, default: 0 },
    bio: { type: String, default: "" },
    availability: { type: String, default: "" },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;


