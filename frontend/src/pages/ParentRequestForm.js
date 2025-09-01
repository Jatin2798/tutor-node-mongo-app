import React, { useState } from "react";

function ParentRequestForm() {
  const [form, setForm] = useState({
    parentName: "",
    contactEmail: "",
    contactPhone: "",
    studentName: "",
    class: "",
    subjects: "",
    schoolName: "",
    address: "",
    areaPin: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      subjects: form.subjects.split(",").map((s) => s.trim()).filter(Boolean),
    };
    const res = await fetch("http://localhost:5000/api/requests", {
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
          <img className="hero-img-sm" src="https://images.unsplash.com/photo-1596495578065-8a35f4b3a7ab?q=80&w=1200&auto=format&fit=crop" alt="Indian students" />
          <div className="quote quote-side">
            <p className="quote-text">"It takes a big heart to help shape little minds."</p>
            <p className="quote-author">— Unknown</p>
          </div>
        </div>
        <h2 className="headline">Create Tutoring Request</h2>
        <p className="subhead">Tell us what you need. We'll help you find matching teachers.</p>
        <form onSubmit={handleSubmit} className="stack">
          <input className="input" name="parentName" placeholder="Parent" value={form.parentName} onChange={handleChange} required />
          <div className="grid-2">
            <input className="input" name="contactEmail" placeholder="Email" value={form.contactEmail} onChange={handleChange} />
            <input className="input" name="contactPhone" placeholder="Phone" value={form.contactPhone} onChange={handleChange} />
          </div>
          <div className="grid-2">
            <input className="input" name="studentName" placeholder="Student Name" value={form.studentName} onChange={handleChange} required />
            <input className="input" name="class" placeholder="Class (e.g. 8)" value={form.class} onChange={handleChange} required />
          </div>
          <input className="input" name="subjects" placeholder="Subjects (comma separated)" value={form.subjects} onChange={handleChange} />
          <div className="grid-2">
            <input className="input" name="schoolName" placeholder="School Name" value={form.schoolName} onChange={handleChange} />
            <input className="input" name="areaPin" placeholder="Area PIN/Zip" value={form.areaPin} onChange={handleChange} />
          </div>
          <textarea className="textarea" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn" type="submit">Submit</button>
            <a className="btn secondary" href="/find-teachers">Find Teachers</a>
          </div>
        </form>
        {result && (
          <pre style={{ marginTop: 16 }}>{JSON.stringify(result, null, 2)}</pre>
        )}
        <div className="quote">
          <p className="quote-text">"Education is the most powerful weapon which you can use to change the world."</p>
          <p className="quote-author">— Nelson Mandela</p>
        </div>
      </div>
    </div>
  );
}

export default ParentRequestForm;


