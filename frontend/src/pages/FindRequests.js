import React, { useState } from "react";

function FindRequests() {
  const [filters, setFilters] = useState({ area: "", class: "", subject: "" });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };

  const search = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.area) params.append("area", filters.area);
    if (filters.class) params.append("class", filters.class);
    if (filters.subject) params.append("subject", filters.subject);
    const res = await fetch(`http://localhost:5000/api/requests?${params.toString()}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="container" style={{ marginTop: 32 }}>
      <div className="panel">
        <div className="hero-row">
          <img className="hero-img-sm" src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop" alt="Students India" />
          <div className="quote quote-side">
            <p className="quote-text">"Tell me and I forget, teach me and I may remember, involve me and I learn."</p>
            <p className="quote-author">— Benjamin Franklin</p>
          </div>
        </div>
        <h2 className="headline">Find Student Requests</h2>
        <form onSubmit={search} className="grid-2" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <input className="input" name="area" placeholder="Area PIN" value={filters.area} onChange={handleChange} />
          <input className="input" name="class" placeholder="Class" value={filters.class} onChange={handleChange} />
          <input className="input" name="subject" placeholder="Subject" value={filters.subject} onChange={handleChange} />
          <button className="btn" type="submit">Search</button>
        </form>
        <ul className="list" style={{ marginTop: 16 }}>
          {results.map((r) => (
            <li key={r._id} className="card" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{r.studentName} (Class {r.class})</strong>
                <span className="muted">{r.status}</span>
              </div>
              <div>Parent: {r.parentName}</div>
              <div>Subjects: {(r.subjects || []).join(", ")}</div>
              <div>School: {r.schoolName}</div>
              <div>Area: {r.areaPin}</div>
            </li>
          ))}
        </ul>
        <div className="quote">
          <p className="quote-text">"Learning is a treasure that will follow its owner everywhere."</p>
          <p className="quote-author">— Chinese Proverb</p>
        </div>
      </div>
    </div>
  );
}

export default FindRequests;


