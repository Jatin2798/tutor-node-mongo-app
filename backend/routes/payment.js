// backend/routes/payment.js
import express from "express";
const router = express.Router();

// Example POST route
router.post("/", async (req, res) => {
  try {
    const { amount, userId } = req.body;

    // Fake payment processing logic (replace with Razorpay/Stripe later)
    console.log(`Processing payment of ${amount} for user ${userId}`);

    res.json({ success: true, message: "Payment request received" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
