import React, { useEffect, useState } from "react";

function ReviewBids() {
  const [requests, setRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [bids, setBids] = useState([]);
  const [actionResult, setActionResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/requests")
      .then((r) => r.json())
      .then(setRequests);
  }, []);

  const loadBids = async (requestId) => {
    const res = await fetch(`http://localhost:5000/api/bids?requestId=${requestId}`);
    const data = await res.json();
    setBids(data);
  };

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedRequestId(id);
    if (id) loadBids(id);
  };

  const acceptBid = async (bidId) => {
    const res = await fetch(`http://localhost:5000/api/bids/${bidId}/accept`, { method: "PATCH" });
    const data = await res.json();
    setActionResult(data);
    if (selectedRequestId) loadBids(selectedRequestId);
  };

  return (
    <div className="container" style={{ marginTop: 32 }}>
      <div className="panel">
        <div className="hero-row">
          <img className="hero-img-sm" src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1200&auto=format&fit=crop" alt="Parent reviewing" />
          <div className="quote quote-side">
            <p className="quote-text">"The expert in anything was once a beginner."</p>
            <p className="quote-author">— Helen Hayes</p>
          </div>
        </div>
        <h2 className="headline">Review Bids</h2>
        <select className="select" value={selectedRequestId} onChange={handleSelect}>
          <option value="">Select Request</option>
          {requests.map((r) => (
            <option key={r._id} value={r._id}>
              {r.studentName} (Class {r.class}) - {r.areaPin}
            </option>
          ))}
        </select>
        <ul className="list" style={{ marginTop: 16 }}>
          {bids.map((b) => (
            <li key={b._id} className="card" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong>₹{b.proposedRate}</strong> <span className="muted">— {b.status}</span>
                </div>
                {b.status === "pending" && (
                  <button className="btn" onClick={() => acceptBid(b._id)}>Accept</button>
                )}
              </div>
              <div className="muted">{b.message}</div>
            </li>
          ))}
        </ul>
        {actionResult && <pre style={{ marginTop: 16 }}>{JSON.stringify(actionResult, null, 2)}</pre>}
        <div className="quote">
          <p className="quote-text">"The beautiful thing about learning is that no one can take it away from you."</p>
          <p className="quote-author">— B. B. King</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewBids;


