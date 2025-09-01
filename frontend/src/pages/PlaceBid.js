import React, { useEffect, useState } from "react";

function PlaceBid() {
  const [requests, setRequests] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ requestId: "", teacherId: "", message: "", proposedRate: "" });
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/requests")
      .then((r) => r.json())
      .then(setRequests);
    fetch("http://localhost:5000/api/teachers")
      .then((r) => r.json())
      .then(setTeachers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, proposedRate: Number(form.proposedRate || 0) };
    const res = await fetch("http://localhost:5000/api/bids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="container" style={{ marginTop: 32 }}>
      <div className="panel">
        <div className="hero-row">
          <img className="hero-img-sm" src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop" alt="Teacher applying" />
          <div className="quote quote-side">
            <p className="quote-text">"Success is where preparation and opportunity meet."</p>
            <p className="quote-author">— Bobby Unser</p>
          </div>
        </div>
        <h2 className="headline">Place a Bid</h2>
        <form onSubmit={handleSubmit} className="stack">
          <select className="select" name="requestId" value={form.requestId} onChange={handleChange} required>
            <option value="">Select Request</option>
            {requests.map((r) => (
              <option key={r._id} value={r._id}>
                {r.studentName} (Class {r.class}) - {r.areaPin}
              </option>
            ))}
          </select>
          <select className="select" name="teacherId" value={form.teacherId} onChange={handleChange} required>
            <option value="">Select Teacher</option>
            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name} - ₹{t.hourlyRate}/hr
              </option>
            ))}
          </select>
          <input className="input" name="proposedRate" placeholder="Proposed Rate" value={form.proposedRate} onChange={handleChange} />
          <textarea className="textarea" name="message" placeholder="Message" value={form.message} onChange={handleChange} />
          <button className="btn" type="submit">Submit Bid</button>
        </form>
        {result && <pre style={{ marginTop: 16 }}>{JSON.stringify(result, null, 2)}</pre>}
        <div className="quote">
          <p className="quote-text">"Opportunities don't happen. You create them."</p>
          <p className="quote-author">— Chris Grosser</p>
        </div>
      </div>
    </div>
  );
}

export default PlaceBid;


