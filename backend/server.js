import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import teachersRouter from "./routes/teachers.js";
import requestsRouter from "./routes/requests.js";
import bidsRouter from "./routes/bids.js";
import matchesRouter from "./routes/matches.js";
import paymentRouter from "./routes/payment.js";



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.NODE_ENV === "production" 
  ? process.env.MONGO_URI_PROD 
  : process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected:", process.env.NODE_ENV))
.catch(err => console.error("❌ MongoDB connection error:", err));
// Sample Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// API Routes
app.use("/api/teachers", teachersRouter);
app.use("/api/requests", requestsRouter);
app.use("/api/bids", bidsRouter);
app.use("/api/matches", matchesRouter);
app.use("/api/payment", paymentRouter);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
