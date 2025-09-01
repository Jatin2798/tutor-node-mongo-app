import React, { useState } from "react";

function TeacherProfileForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subjects: "",
    classes: "",
    areas: "",
    experienceYears: "",
    hourlyRate: "",
    bio: "",
    availability: "",
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
      classes: form.classes.split(",").map((s) => s.trim()).filter(Boolean),
      areas: form.areas.split(",").map((s) => s.trim()).filter(Boolean),
      experienceYears: Number(form.experienceYears || 0),
      hourlyRate: Number(form.hourlyRate || 0),
    };
    const res = await fetch("http://localhost:5000/api/teachers", {
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
          <img
            className="hero-img-sm"
            src={`${process.env.PUBLIC_URL}/teacher.jpg`}
            alt="Teacher at whiteboard"
            loading="eager"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `${process.env.PUBLIC_URL}/teacher.svg`;
            }}
          />
          <div className="quote quote-side">
            <p className="quote-text">"A teacher affects eternity; they can never tell where their influence stops."</p>
            <p className="quote-author">— Henry Adams</p>
          </div>
        </div>
        <h2 className="headline">Create Teacher Profile</h2>
        <p className="subhead">Tell parents about your skills, areas, and availability.</p>
        <form onSubmit={handleSubmit} className="stack">
          <div className="grid-2">
            <input className="input" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input className="input" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="grid-2">
            <input className="input" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
            <input className="input" name="availability" placeholder="Availability (e.g. evenings)" value={form.availability} onChange={handleChange} />
          </div>
          <div className="grid-2">
            <input className="input" name="subjects" placeholder="Subjects (comma separated)" value={form.subjects} onChange={handleChange} />
            <input className="input" name="classes" placeholder="Classes (comma separated)" value={form.classes} onChange={handleChange} />
          </div>
          <div className="grid-2">
            <input className="input" name="areas" placeholder="Areas/PINs (comma separated)" value={form.areas} onChange={handleChange} />
            <input className="input" name="hourlyRate" placeholder="Hourly Rate" value={form.hourlyRate} onChange={handleChange} />
          </div>
          <input className="input" name="experienceYears" placeholder="Experience (years)" value={form.experienceYears} onChange={handleChange} />
          <textarea className="textarea" name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} />
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn" type="submit">Save Profile</button>
            <a className="btn secondary" href="/find-requests">Find Requests</a>
          </div>
        </form>
        {result && <pre style={{ marginTop: 16 }}>{JSON.stringify(result, null, 2)}</pre>}
        <div className="quote">
          <p className="quote-text">"A good teacher can inspire hope, ignite the imagination, and instill a love of learning."</p>
          <p className="quote-author">— Brad Henry</p>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfileForm;


