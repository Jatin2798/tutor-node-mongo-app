// frontend/src/pages/Payment.js
import React, { useState } from "react";

function Payment() {
  const [status, setStatus] = useState("");

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 100, userId: "frontend-user" }), // example data
      });

      const data = await response.json();
      console.log("Payment Response:", data);

      setStatus(data.success ? "✅ " + data.message : "❌ " + data.message);
    } catch (error) {
      console.error("Error sending payment:", error);
      setStatus("❌ Error sending payment");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Page</h1>
      <p>This page will send a payment request to the backend.</p>
      <button onClick={handlePayment}>Send Payment</button>
      <p>Status: {status}</p>
    </div>
  );
}

export default Payment;
