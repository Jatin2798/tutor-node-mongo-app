import React, { useEffect, useState } from "react";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Cannot reach backend"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Home</h1>
      <p>Welcome to Home Tutor app.</p>
      <h3 style={{ color: "green" }}>{message}</h3>
    </div>
  );
}

export default Home;


