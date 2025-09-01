import React, { useState } from "react";

function FindTeachers() {
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
    const res = await fetch(`http://localhost:5000/api/teachers?${params.toString()}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="container" style={{ marginTop: 32 }}>
      <div className="panel">
        <div className="hero-row">
          <img className="hero-img-sm" src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop" alt="Teachers India" />
          <div className="quote quote-side">
            <p className="quote-text">"Teaching kids to count is fine, but teaching them what counts is best."</p>
            <p className="quote-author">— Bob Talbert</p>
          </div>
        </div>
        <h2 className="headline">Find Teachers</h2>
        <form onSubmit={search} className="grid-2" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <input className="input" name="area" placeholder="Area PIN" value={filters.area} onChange={handleChange} />
          <input className="input" name="class" placeholder="Class" value={filters.class} onChange={handleChange} />
          <input className="input" name="subject" placeholder="Subject" value={filters.subject} onChange={handleChange} />
          <button className="btn" type="submit">Search</button>
        </form>
        <ul className="list" style={{ marginTop: 16 }}>
          {results.map((t) => (
            <li key={t._id} className="card" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{t.name}</strong>
                <span className="muted">₹{t.hourlyRate}/hr</span>
              </div>
              <div className="muted">{t.email}</div>
              <div>Subjects: {(t.subjects || []).join(", ")}</div>
              <div>Classes: {(t.classes || []).join(", ")}</div>
              <div>Areas: {(t.areas || []).join(", ")}</div>
            </li>
          ))}
        </ul>
        <div className="quote">
          <p className="quote-text">"The art of teaching is the art of assisting discovery."</p>
          <p className="quote-author">— Mark Van Doren</p>
        </div>
      </div>
    </div>
  );
}

export default FindTeachers;


